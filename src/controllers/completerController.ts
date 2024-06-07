import { Request, Response } from 'express';
import FormData from 'form-data';
import fastAPI from "../service/generationLibraryAPI/http"
import fs from 'fs';
import { Readable, Stream } from 'stream';
import path from 'path';
import Transaction,{TransactionRow} from "../models/transaction"
import firebaseService from "../firebase/firebase"
import FCM, { FCMRow } from '../models/fcm';
import jwt from '../service/JWT/jwt';
type ControllerFunction = (req: Request, res: Response) => void;

class CompleterController {


  complete:ControllerFunction=async(req, res) => {
        try {
          console.log(req.body);
          
          const {transaction_id,text}=req.body;
          if(!transaction_id || !text){
            return res.status(400).send("Нет транзакции или текста");
           }
           const transaction=await Transaction.findOne({
            where:{
              [TransactionRow.uuid]:transaction_id
            }
           });
           if(!transaction){
            return res.status(400).send("Транзакция не найдена");
           }
           const [_,type]=transaction.uuid.split(".")
           if(transaction.user_id){
            const token =await FCM.findOne({
              where:{
                [FCMRow.user_id]:transaction.user_id
              }
            })
            if(token){
              firebaseService.sendNotification(token.token,text,type)
            }
           }else if(transaction.guest_id){
            const token =await FCM.findOne({
              where:{
                [FCMRow.guest_id]:transaction.guest_id
              }
            })
            if(token){
              firebaseService.sendNotification(token.token,text,type)
            }
           }
           //firebaseService.sendNotification()
          res.send("tokens");
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }
      verify:ControllerFunction=async(req, res) => {
        try {
          console.log(req.body);
          
          const token=req.headers.authorization;
          if(!token){
            return res.status(401).send("Нет токена");
           }
           const isVerify= jwt.accessVerify(token)
           //firebaseService.sendNotification()
           if(!isVerify){
            return res.status(401).send("Невалидный токен");
           }
          res.send("OK");
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }

      
}

export default new CompleterController()
