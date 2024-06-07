import { Request, Response } from 'express';
import GusetService from "../service/guestService"
import jwt from '../service/JWT/jwt';
import { GuestControllerError } from '../service/customError/customError';
import SubjectService from "../service/subjectService/subjecrService"
type ControllerFunction = (req: Request, res: Response) => void;

class GuestController {
  auth:ControllerFunction=async(req, res) => {
        try {
          const {deviceId} = req.body as {deviceId:string};
          console.log(deviceId);
          
          if(!deviceId){
            res.status(400).send("no device id");
          }
         const tokens= await GusetService.authGuest(deviceId);
          res.send(tokens);
        } catch (error) { 
          console.log(error);
          res.status(500).send(error);
        }
      }
      refresh:ControllerFunction=async(req, res) => {
        try {
          const {token} = req.body as {token:string};
          console.log(token);
          
          if(!token){
            res.status(400).send("no token");
          }
           jwt.refreshVerify(token);
          const tokens= await GusetService.refresh(token);
          res.send(tokens);
        } catch (error) { 
          console.log(error);
          if(error instanceof GuestControllerError){
            res.status(error.statusCode).send(null);
            return;
          }
          res.status(500).send(error);
        }
      }
      requestsInfo:ControllerFunction=async(req, res) => {
        try {
          const token = req.headers.authorization;

          console.log(token);
          
          if(!token){
           return res.status(401).send("no auth");
          }
          const info=await GusetService.requestsInfo(token);
          console.log(info);
          
          res.send(info);
        } catch (error) { 
          console.log(error);
          if(error instanceof GuestControllerError){
            res.status(error.statusCode).send(null);
            return;
          }
          res.status(500).send(error);
        }
      }
      // request:ControllerFunction=async(req, res) => {
      //   try {
      //     const token = req.headers.authorization;
          
      //     console.log(token);
          
      //     if(!token){
      //      return res.status(401).send("no auth");
      //     }
      //     const {text,type,lang} = req.body as {text:string|undefined,type:string,lang:string};
      //     const file = req.file;
      //     if(type=="math"){
      //      await SubjectService.math(file,text,lang)
      //     }
      //     const info=await GusetService.requestsInfo(token);
      //     console.log(info);
          
      //     res.send(info);
      //   } catch (error) { 
      //     console.log(error);
      //     if(error instanceof GuestControllerError){
      //       res.status(error.statusCode).send(null);
      //       return;
      //     }
      //     res.status(500).send(error);
      //   }
      // }
      

      
}

export default new GuestController()
