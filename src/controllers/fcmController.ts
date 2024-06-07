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
           if(!tokenRepo){
            return res.status(401).send("неавтор");
           }
           const user =await User.findOne({
            where:{
              [UserRow.login]:tokenRepo.sub,
            }
           })
           if(!user){
            return res.status(401).send("неавтор");
           }
          await FCM.findOrCreate({
            where:{
              [FCMRow.token]:token,
            },
            defaults:{
              [FCMRow.token]:token,
              [FCMRow.user_id]:user.id,
            }
          });
          return res.send("OK");
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }
      
      
}

export default new SubjectController()
