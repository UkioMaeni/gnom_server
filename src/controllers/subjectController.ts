import { Request, Response } from 'express';
import FormData from 'form-data';
import subjectService from "../service/subjectService/subjecrService"
import fs from 'fs';
import { Readable, Stream } from 'stream';
import path from 'path';
import firebaseService from "../firebase/firebase"
import GuestTokens,{GuestTokensRow} from "../models/guest_tokens"
import UserTokens,{UserTokensRow} from "../models/user_tokens"
import User,{UserRow} from '../models/user';
import Transaction, { TransactionRow } from '../models/transaction';
import Guest, { GuestRow } from '../models/guest';
import { randomUUID } from 'crypto';
import jwt from '../service/JWT/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import UnreadMessages, { UnreadMessagesRow } from '../models/unreadMessages';
import FCM, { FCMRow } from '../models/fcm';
type ControllerFunction = (req: Request, res: Response) => void;

class SubjectController {


  request:ControllerFunction=async(req, res) => {
        try {
          console.log(req.body);
          const file=req.file;
          const {authorization}=req.headers;
          console.log(authorization);
          if(!authorization){
            return res.status(401).send("неавтор");
           }
           
          let {type,text,messageId,lang}=req.body as {type:string,text:string|undefined,messageId:string,lang:string};
          if(!lang){
            return res.status(400).send("нет языка");
          }
          if(lang!="ru" && lang!="ar" && lang!="en"){
            lang= "en";
          }
          if(!type){
            return res.status(400).send("нет типа");
           }
           const tokenRepo=await jwt.getPayloadInAccess(authorization)
           console.log(tokenRepo);
           
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
           }else if(tokenRepo["type"]=="guest"){
            user =await Guest.findOne({
              where:{
                [GuestRow.deviceId]:tokenRepo.sub,
              }
            })
           }else{
            return res.status(401).send("неавтор");
           }
           
           console.log(user);
           if(!user){
              return res.status(401).send("неавтор");
           }
            
           let result:number|string=0;
           const uuid= randomUUID();
           switch(type){
              case "parafrase":
                res.send({code:0,result:  null});
                result=await  subjectService.paraphrasingText(file,text,lang)
                console.log(result);
                
                if(result){
                    this.addMessage(user,messageId,result,type);
                }
                return
              break;
              case "math":
                await this.createTransaction(uuid,"math",user,messageId);
                result=await subjectService.math(file,text,lang,uuid+".math")
                if(result==0){
                  return res.send({code:0,result:"",});
                }
              break;
              case "referat":
                await this.createTransaction(uuid,"referat",user,messageId);
                result = await subjectService.referat(file,text,lang,uuid+".referat") as number
                if(result==0){
                  return res.send({code:0,result:""});
                }
              break;
              case "essay":
                res.send({code:0,result:  null});
                
                result = await subjectService.essay(file,text,lang,uuid+".essay") as string
                console.log(result);
                console.log(user);
                
                if(result){
                    this.addMessage(user,messageId,result,type);
                }
                return
              break;
              case "presentation":
                
                await this.createTransaction(uuid,"presentation",user,messageId);
                result = await subjectService.presentation(file,text,lang,uuid+".presentation")
                if(result==0){
                   res.send({code:0,result:""});
                }
                return
              break;
              case "reduce":
                res.send({code:0,result:  null});
                //firebaseService.sendNotification("73787F5B0C1F2F2C01B6E114094805604770DBFA105BC16F516F8640DFB38E66","unread")
                result = await subjectService.reduce(file,text,lang) as string
                if(result){
                    this.addMessage(user,messageId,result,type);
                }
                return
              break;
              case "sovet":
                res.send({code:0,result:  null});
                result = await subjectService.sovet(file,text,lang)
                if(result){
                    this.addMessage(user,messageId,result,type);
                }
                return
              break;
              case "generation":
                res.send({code:0,result:  null});
                result = await subjectService.generation(file,text,lang,uuid+".generation")
                
                if(result){
                    this.addMessage(user,messageId,result,type);
                }
                return
              break;
              default: return res.status(400).send({code:0,result:"error request"});
           }
           return res.send({code:400,result:""});
           //
          //  const formdata=new FormData()
          //   const newFilePath = path.join(__dirname,`../tempFiles/${Date.now()}.png`);
          //   fs.writeFileSync(newFilePath, file.buffer)
          //   //console.log(await fs.readFile(newFilePath));
            
          //  formdata.append("file",fs.createReadStream(newFilePath));
          //  formdata.append("type","self");
          //  const result= await  fastAPI.sendMathSolutuin(formdata)
          //  if(result==0){
          //   fs.unlink(newFilePath,()=>{});
          //  }
          
        } catch (error) { 
          console.log(error);
          if(error instanceof TokenExpiredError){
            return res.status(401).send(error);
          }
          res.status(500).send(error);
        }
      }
      
      async addMessage(user:User|Guest,messageId:string,text: string,subjectType:string ){
        try {
          if("email" in user){
            await UnreadMessages.create({
              [UnreadMessagesRow.message_id]:messageId,
              [UnreadMessagesRow.text]:text,
              [UnreadMessagesRow.subject_type]:subjectType,
              [UnreadMessagesRow.user_id]:user.id,
              [UnreadMessagesRow.guest_id]:null,
            })
            const token =await FCM.findOne({
              where:{
                [FCMRow.user_id]:user.id
              }
            })
            if(token){
              firebaseService.sendNotification(token.token,"unread")
            }
           }else {
            
            console.log("start create guset mssage");
            await UnreadMessages.create({
              [UnreadMessagesRow.message_id]:messageId,
              [UnreadMessagesRow.text]:text,
              [UnreadMessagesRow.subject_type]:subjectType,
              [UnreadMessagesRow.user_id]:null,
              [UnreadMessagesRow.guest_id]:user.id,
            });
            console.log("stop create guset mssage");
            const token =await FCM.findOne({
              where:{
                [FCMRow.guest_id]:user.id
              }
            })
            console.log(token);
            
            if(token){
              firebaseService.sendNotification(token.token,"unread")
            }
           }
        } catch (error) {
          console.log(error);
          
        }
      }
      private async createTransaction(transactionId:string,subject:string,auth:User|Guest,messageId:string){
        await Transaction.create({
            [TransactionRow.uuid]:transactionId+"."+subject,
            [TransactionRow.message_id]:messageId,
            [TransactionRow.user_id]:(auth instanceof User)?auth.id:null,
            [TransactionRow.guest_id]:(auth instanceof Guest)?auth.id:null,
        })
    }
      
}

export default new SubjectController()
