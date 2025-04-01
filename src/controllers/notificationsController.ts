import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { sendBotSupport } from '../service/tgBot/tgBot';
import jwt from '../service/JWT/jwt';
import User, { UserRow } from '../models/user';
import Guest, { GuestRow } from '../models/guest';
import { randomUUID } from 'crypto';
import Base64 from 'crypto-js/enc-base64';
import crypto from 'crypto';
import PaymentTransactions, { PaymentTransactionsRow } from '../models/paymentTransactions';
import userService from '../service/userService';
import firebase from '../firebase/firebase';
import FCM, { FCMRow } from '../models/fcm';
import UserNotify, { UserNotifyRow } from '../models/user_notify';
import { JwtPayload } from 'jsonwebtoken';
type ControllerFunction = (req: Request, res: Response) => void;

function sha256(message:string) {
  const hash = crypto.createHash('sha256');
  hash.update(message);
  return hash.digest('hex');
}


class NotificationsController {
  getNotifications:ControllerFunction=async(req, res) => {
        try {
          const {authorization}=req.headers;
          if(!authorization){
            return res.status(401).send("no auth");
          }
          let tokenRepo:JwtPayload;
          try {
            tokenRepo=await jwt.getPayloadInAccess(authorization)
          } catch (error) {
            return  res.status(401).send("no auth");
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
            return  res.status(401).send("no auth");
           }
          const notify = await UserNotify.findAll({
            where:{
              [UserNotifyRow.userId]:(user as User).id
            }
          })
           
          res.status(200).send(notify);
          notify.forEach((element)=>{
             UserNotify.update(
              {
                [UserNotifyRow.status]:"READ"
              },{
                where:{
                  [UserNotifyRow.id]:element.id
                }
              }
            )
          })
          
        } catch (error) { 
          console.log(error);
          
          res.status(500).send("");
        }
      }

      
}

export default new NotificationsController()




