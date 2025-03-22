import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { sendBotSupport } from '../service/tgBot/tgBot';
import jwt from '../service/JWT/jwt';
import User, { UserRow } from '../models/user';
import Guest from '../models/guest';
import { randomUUID } from 'crypto';
import sha256 from 'sha256';
import PaymentTransactions, { PaymentTransactionsRow } from '../models/paymentTransactions';
type ControllerFunction = (req: Request, res: Response) => void;


const paymentInfoByLocale={
  "ru":[
    {
      id: "ru_2025_bronze",
      price:10,
      description:"Подписка BRONZE на сервис Gnom Helper"
    },
    {
      id: "ru_2025_gold",
      price:30,
      description:"Подписка GOLD на сервис Gnom Helper"
    },
    {
      id: "ru_2025_silver",
      price:20,
      description:"Подписка SILVER на сервис Gnom Helper"
    }
  ],
  "en":[
    {
      id: "ru_2025_bronze",
      price:10,
      description:"Подписка BRONZE на сервис Gnom Helper"
    },
    {
      id: "ru_2025_gold",
      price:30,
      description:"Подписка GOLD на сервис Gnom Helper"
    },
    {
      id: "ru_2025_silver",
      price:20,
      description:"Подписка SILVER на сервис Gnom Helper"
    }
  ],
  "ar":[
    {
      id: "ru_2025_bronze",
      price:10,
      description:"Подписка BRONZE на сервис Gnom Helper"
    },
    {
      id: "ru_2025_gold",
      price:30,
      description:"Подписка GOLD на сервис Gnom Helper"
    },
    {
      id: "ru_2025_silver",
      price:20,
      description:"Подписка SILVER на сервис Gnom Helper"
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
          const orderId=randomUUID();
          //генерация временного токена токена
          const initString:string=amount+description+orderId+terminalPass+terminalKey;
          const encodedString = sha256(initString);  
          const token =encodedString;
          const response = await fetch(
            tinkInitUrl,
            {
              method:"POST",
              headers:{
                "Content Type":"application/json"
              },
              body:JSON.stringify(
                {
                  "TerminalKey":terminalKey,
                  "Amount": amount,
                  "OrderId": orderId,
                  "Description": description,
                  "Token": token,
                  "Receipt": {
                      "Taxation": "osn",
                      "Email": "priz.a47@gmail.com",
                      "Items": [
                      {
                          "Name":description,
                          "Price":amount,
                          "Quantity":1.00,
                          "Amount":amount,
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
            if(data["Success"]==true){
              paymentUrl=data["PaymentURL"];
              await PaymentTransactions.create({
                [PaymentTransactionsRow.orderId]:orderId,
                [PaymentTransactionsRow.status]:"init",
                [PaymentTransactionsRow.userId]:userId,
                [PaymentTransactionsRow.terminalPaymentId]:data["PaymentId"],
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
          sendBotSupport(JSON.stringify(req.body));
          return res.status(200).send("OK");
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




