import { Request, Response } from 'express';
import FormData from 'form-data';
import subjectService from "../service/subjectService/subjecrService"
import fs from 'fs';
import { Readable, Stream } from 'stream';
import path from 'path';
import firebaseService from "../firebase/firebase"
import FCM,{FCMRow} from "../models/fcm"
import UserTokens, { UserTokensRow } from "../models/user_tokens"
import User, { UserRow } from "../models/user"
import jwt from '../service/JWT/jwt';
import Guest, { GuestRow } from '../models/guest';
type ControllerFunction = (req: Request, res: Response) => void;

class SubjectController {


  setToken:ControllerFunction=async(req, res) => {
        try {
          
          const {authorization}=req.headers;
          console.log(authorization);
          if(!authorization){
            return res.status(401).send("неавтор");
           }
           const {token} = req.body;
          if(!token){
            return res.status(400).send("нет токена");
          }
          const tokenRepo=jwt.getPayloadInAccess(authorization)
          console.log(tokenRepo);
          
           if(!tokenRepo){
            return res.status(401).send("неавтор");
           }
           console.log(tokenRepo);
           if(tokenRepo["type"]=="guest"){
            console.log("SET GUEST");
            
            const guest =await Guest.findOne({
              where:{
                [GuestRow.deviceId]:tokenRepo.sub,
              }
             })
             console.log(guest);
             if(!guest){
              
              return res.status(401).send("неавтор");
             }
             const fcm = await FCM.findOne({
              where:{
                [FCMRow.guest_id]:guest.id,
              }
             });
            //  const fcm = await FCM.findOrCreate({
            //   where:{
            //     [FCMRow.guest_id]:guest.id,
            //   },
            //   defaults:{
            //     [FCMRow.token]:token,
            //     [FCMRow.user_id]:null,
            //     [FCMRow.guest_id]:guest.id,
            //   }
            // });
            console.log("////////////////////");
            console.log(fcm);
            console.log(token);
            
            console.log("////////////////////");
            
            if(fcm){
             await FCM.update({
                [FCMRow.token]:token,
                
              },{
                where:{
                  [FCMRow.guest_id]:guest.id,
                }
              }
            )
            }else{
              await FCM.create({
                  [FCMRow.token]:token,
                  [FCMRow.user_id]:null,
                  [FCMRow.guest_id]:guest.id,
              })
            }
            const fcmqq = await FCM.findOne({
              where:{
                [FCMRow.guest_id]:guest.id,
              }
            })
            console.log(fcmqq);
            console.log("////////////////////");
            console.log(guest.id);
           }else if(tokenRepo["type"]=="user"){
            console.log("SET USER");
            const user =await User.findOne({
              where:{
                [UserRow.login]:tokenRepo.sub,
              }
             })
             if(!user){
              return res.status(401).send("неавтор");
              
             }
             const fcm = await FCM.findOne({
              where:{
                [FCMRow.user_id]:user.id,
              }
             });
            //  const fcm= await FCM.findOrCreate({
            //   where:{
            //     [FCMRow.token]:token,
            //     [FCMRow.user_id]:user.id,
            //   },
            //   defaults:{
            //     [FCMRow.token]:token,
            //     [FCMRow.user_id]:user.id,
            //   }
            // });
            if(fcm){
              FCM.update({
                [FCMRow.user_id]:user.id,
              },{
                where:{
                  [FCMRow.token]:token,
                }
              }
            )
            }else{
              await FCM.create({
                  [FCMRow.token]:token,
                  [FCMRow.user_id]:user.id,
                  [FCMRow.guest_id]:null,
              })
            }
            const fcmqq = await FCM.findOne({
              where:{
                [FCMRow.user_id]:user.id,
              }
            })
            console.log("NEW USER FCM");
            
            console.log(fcmqq);
           }
           
          
          return res.send("OK");
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }
      
      
}

export default new SubjectController()
