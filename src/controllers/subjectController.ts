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
           
          const {type,text}=req.body as {type:string,text:string|undefined};
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
                result=await  subjectService.paraphrasingText(file,text,"ru")
                if(result){
                  return res.send({code:0,result:result});
                }
              break;
              case "math":
                await this.createTransaction(uuid,"math",user);
                result=await subjectService.math(file,text,"ru",uuid+".math")
                if(result==0){
                  return res.send({code:0,result:""});
                }
              break;
              case "referat":
                await this.createTransaction(uuid,"referat",user);
                result = await subjectService.referat(file,text,"ru",uuid+".referat") as number
                if(result==0){
                  return res.send({code:0,result:""});
                }
              break;
              case "essay":
                await this.createTransaction(uuid,"essay",user);
                result = await subjectService.essay(file,text,"ru",uuid+".essay") as string
                if(result){
                  return res.send({code:0,result:result});
                }
              break;
              case "presentation":
                await this.createTransaction(uuid,"presentation",user);
                result = await subjectService.presentation(file,text,"ru",uuid)
                if(result){
                  return res.send({code:0,result:""});
                }
              break;
              case "reduce":
                result = await subjectService.reduce(file,text,"ru") as string
                if(result){
                  return res.send({code:0,result:result});
                }
              break;
              case "sovet":
                result = await subjectService.sovet(file,text,"ru")
                if(result){
                  return res.send({code:0,result:result});
                }
              break;
           }
           res.status(400).send({code:0,result:"error request"});
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
      private async createTransaction(transactionId:string,subject:string,auth:User|Guest){
        await Transaction.create({
            [TransactionRow.uuid]:transactionId+"."+subject,
            [TransactionRow.user_id]:(auth instanceof User)?auth.id:null,
            [TransactionRow.guest_id]:(auth instanceof Guest)?auth.id:null,
        })
    }
      
}

export default new SubjectController()
