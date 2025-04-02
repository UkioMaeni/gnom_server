import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { sendBotSupport } from '../service/tgBot/tgBot';
import jwt from '../service/JWT/jwt';
import User, { UserRow } from '../models/user';
import Guest from '../models/guest';
import { randomUUID } from 'crypto';
import Base64 from 'crypto-js/enc-base64';
import crypto from 'crypto';
import PaymentTransactions, { PaymentTransactionsRow } from '../models/paymentTransactions';
import userService from '../service/userService';
import firebase from '../firebase/firebase';
import FCM, { FCMRow } from '../models/fcm';
import UserNotify, { UserNotifyRow } from '../models/user_notify';
type ControllerFunction = (req: Request, res: Response) => void;


function sha256(message:string) {
  const hash = crypto.createHash('sha256');
  hash.update(message);
  return hash.digest('hex');
}

export const paymentInfoByLocale={
  "ru":[
    {
      id: "ru_2025_bronze",
      price:10,
      description:"Подписка BRONZE на сервис Gnom Helper",
      requestCount:10,
      name:"BRONZE"
    },
    {
      id: "ru_2025_gold",
      price:30,
      description:"Подписка GOLD на сервис Gnom Helper",
      requestCount:30,
      name:"GOLD"
    },
    {
      id: "ru_2025_silver",
      price:20,
      description:"Подписка SILVER на сервис Gnom Helper",
      requestCount:20,
      name:"SILVER"
    }
  ],
  "en":[
    {
      id: "ru_2025_bronze",
      price:10,
      description:"Подписка BRONZE на сервис Gnom Helper",
      requestCount:10
    },
    {
      id: "ru_2025_gold",
      price:30,
      description:"Подписка GOLD на сервис Gnom Helper",
      requestCount:30
    },
    {
      id: "ru_2025_silver",
      price:20,
      description:"Подписка SILVER на сервис Gnom Helper",
      requestCount:20
    }
  ],
  "ar":[
    {
      id: "ru_2025_bronze",
      price:10,
      description:"Подписка BRONZE на сервис Gnom Helper",
      requestCount:10
    },
    {
      id: "ru_2025_gold",
      price:30,
      description:"Подписка GOLD на сервис Gnom Helper",
      requestCount:30
    },
    {
      id: "ru_2025_silver",
      price:20,
      description:"Подписка SILVER на сервис Gnom Helper",
      requestCount:20
    }
  ],
}

class PayNotifyController {
  init:ControllerFunction=async(req, res) => {
        try {
          const {authorization}=req.headers;
          if(!authorization){
            return res.status(401).send("no auth");
          }
          const tokenRepo=await jwt.getPayloadInAccess(authorization)
          if(!tokenRepo){
            return res.status(401).send("неавтор");
          }
          let user:User|Guest|null;
          if(tokenRepo["type"]=="user"){
          user =await User.findOne({
            where:{
              [UserRow.login]:tokenRepo.sub,
            }
          })
          if(!user){
            return res.status(401).send("неавтор");
          }
          }else{
          return res.status(403).send("notUserRole");
          }
          const {paymentId,locale}=req.body as {paymentId:string,locale:string};
          if(locale!="ru"&&locale!="en"&&locale!="ar"){
            return res.status(400).send("notLocale");
          }
          if(!paymentId||!locale){
            return res.status(400).send("dataIsError");
          }
          const tinkInitUrl=process.env.TINKOFF_INIT_URL
          const terminalKey=process.env.TERMINAL_KEY
          const terminalPass=process.env.TERMINAL_PASS

          if(!tinkInitUrl||!terminalKey||!terminalPass){
            return res.status(500).send("SERVER_ERROR_NOT_ENV");
          }
          let amount:number=0;
          let description:string="";
          if(locale=="ru"){
            for(var element of paymentInfoByLocale.ru){
              if(element.id==paymentId){
                amount=element.price;
                description=element.description;
                break;
              }
            }
            
          }else{
            return res.status(403).send("notAvailable");
          }
          if(amount==0||description.length==0){
            return res.status(403).send("notPaymentId");
          }
          const userId=(user as User).id; 
          let orderId=randomUUID();
          orderId=orderId+"_"+user.id.toString()
          //генерация временного токена токена
          console.log("amount");
          console.log(amount*100);
          console.log("description");
          console.log(description);
          console.log("orderId");
          console.log(orderId);
          console.log("terminalPass");
          console.log(terminalPass);
          console.log("terminalKey");
          console.log(terminalKey);
          const initString:string=amount*100+description+orderId+terminalPass+terminalKey;
          console.log("initString");
          console.log(initString);
          
          const encodedString = sha256(initString); 
          console.log("encodedString");
          console.log(encodedString); 
          const token =encodedString;
          const response = await fetch(
            tinkInitUrl,
            {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(
                {
                  "TerminalKey":terminalKey,
                  "Amount": amount*100,
                  "OrderId": orderId,
                  "Description": description,
                  "Token": token,
                  "Receipt": {
                      "Taxation": "osn",
                      "Email": "priz.a47@gmail.com",
                      "Items": [
                      {
                          "Name":description,
                          "Price":amount*100,
                          "Quantity":1.00,
                          "Amount":amount*100,
                          "Tax":"vat10"
                      }
                      ]
                  }
                }
              )
            }
          );
          let paymentUrl:string="";
          if(response.ok){
            const data=await response.json();
            console.log(data);
            
            if(data["Success"]==true){
              paymentUrl=data["PaymentURL"];
              await PaymentTransactions.create({
                [PaymentTransactionsRow.orderId]:orderId,
                [PaymentTransactionsRow.status]:"AUTHORIZED",
                [PaymentTransactionsRow.userId]:userId,
                [PaymentTransactionsRow.terminalPaymentId]:data["PaymentId"],
                [PaymentTransactionsRow.localPaymentId]:paymentId
              });
            }
          }
          if(paymentUrl.length==0){
            return res.status(305).send("serviceNotWork");
          }
          
          
          return res.status(200).send({paymentUrl});
          
        } catch (error) { 
          console.log(error);
          
          res.status(500).send("");
        }
      }

      paymentHook:ControllerFunction=async(req, res) =>{
        try {
          console.log(req.body);
          console.log(req.body);
          let {Status,OrderId,PaymentId} = req.body as {Status:string,OrderId:string,PaymentId:string};
          sendBotSupport(JSON.stringify(req.body));
          if(!Status||!OrderId||!PaymentId){
            return res.status(500).send("");
          }
          PaymentId=PaymentId.toString();
          if(Status=="CONFIRMED"){
            const paymentInfo= await PaymentTransactions.findOne({
              where:{
                [PaymentTransactionsRow.orderId]:OrderId,
                [PaymentTransactionsRow.terminalPaymentId]:PaymentId,
              }
            });
            if(!paymentInfo){
              
             
              sendBotSupport(JSON.stringify(req.body)+"\n требуется вмешательство. не найдена запись о транзакции");
              return res.status(500).send("");
            }else{
              const user= await User.findOne({
                where:{
                  [UserRow.id]:paymentInfo.userId
                }
              })
              if(!user){
                
                sendBotSupport(JSON.stringify(req.body)+"\n требуется вмешательство. не найден пользователь");
                return res.status(500).send("");
              }else{
                let requestCount=-1;
                let name="";
                for(var element of paymentInfoByLocale.ru){
                  if(element.id==paymentInfo.localPaymentId){
                    requestCount=element.requestCount;
                    name=element.name;
                    break;
                  }
                }
                if(requestCount==-1){
                  sendBotSupport(JSON.stringify(req.body)+"\n требуется вмешательство. не найден локальный идентификатор")
                  return res.status(500).send("");
                }else{
                  res.status(200).send("OK");
                  await PaymentTransactions.update(
                    {
                      [PaymentTransactionsRow.status]:"CONFIRMED",
                    },{
                      where:{
                        [PaymentTransactionsRow.orderId]:OrderId,
                        [PaymentTransactionsRow.terminalPaymentId]:PaymentId,
                      }
                    }
                  );
                  await userService.addRequestAllType(user.login,requestCount);
                  await UserNotify.create({
                    [UserNotifyRow.userId]:user.id,
                    [UserNotifyRow.notifyType]:"payment_succes",
                    [UserNotifyRow.notifyInfo]:name,
                    [UserNotifyRow.status]:"NEW",
                  })
                  const fcm = await FCM.findOne({
                    where:{
                      [FCMRow.user_id]:user.id
                    }
                  })
                  if(fcm!=null){
                    firebase.sendNotification(fcm.token,"payment")
                  }else{
                    console.log("Не найден fcm токен юзера");
                    
                  }
                  
                }
                
              }
              
              
              
            }
          }else{
            return res.status(200).send("OK");
          }
          
        } catch (error) {
          console.log(error);
          
          res.status(500).send("");
        }
      }
      payItems:ControllerFunction=async(req, res) =>{
        try {
          const {authorization}=req.headers;
          if(!authorization){
            return res.status(401).send("no auth");
          }
          const {locale}=req.body as {locale:string};
          if(locale=="ru"){
            return res.status(200).send(paymentInfoByLocale.ru);
          }
          if(locale=="en"){
            return res.status(200).send(paymentInfoByLocale.en);
          }
          if(locale=="ar"){
            return res.status(200).send(paymentInfoByLocale.ar);
          }
          return res.status(403).send("notSupport");
        } catch (error) {
          console.log(error);
          
          res.status(500).send("");
        }
      }

      
}

export default new PayNotifyController()




