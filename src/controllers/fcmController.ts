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
            const guest =await Guest.findOne({
              where:{
                [GuestRow.deviceId]:tokenRepo.sub,
              }
             })
             console.log(guest);
             if(!guest){
              
              return res.status(401).send("неавтор");
             }
             const fcm = await FCM.findOrCreate({
              where:{
                [FCMRow.token]:token,
                [FCMRow.guest_id]:guest.id,
              },
              defaults:{
                [FCMRow.token]:token,
                [FCMRow.user_id]:null,
                [FCMRow.guest_id]:guest.id,
              }
            });
            if(fcm[1]){
              FCM.update({
                [FCMRow.guest_id]:guest.id,
              },{
                where:{
                  [FCMRow.token]:token,
                }
              }
            )
            }
            console.log(fcm);
            console.log(guest.id);
           }else if(tokenRepo["type"]=="user"){
            const user =await User.findOne({
              where:{
                [UserRow.login]:tokenRepo.sub,
              }
             })
             if(!user){
              return res.status(401).send("неавтор");
              
             }
             const fcm= await FCM.findOrCreate({
              where:{
                [FCMRow.token]:token,
                [FCMRow.user_id]:user.id,
              },
              defaults:{
                [FCMRow.token]:token,
                [FCMRow.user_id]:user.id,
              }
            });
            if(fcm[1]){
              FCM.update({
                [FCMRow.user_id]:user.id,
              },{
                where:{
                  [FCMRow.token]:token,
                }
              }
            )
            }
           }
           
          
          return res.send("OK");
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }
      
      
}

export default new SubjectController()
