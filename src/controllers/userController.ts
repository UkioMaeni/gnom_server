import { Request, Response } from 'express';
import mailRepo from "../repositoryes/mailCodeRepo"
import mailService from "../service/mailer/mailer"
import UserService from "../service/userService"
import { GuestControllerError } from '../service/customError/customError';
import jwt from '../service/JWT/jwt';
import UnreadMessages, { UnreadMessagesRow } from '../models/unreadMessages';
import User, { UserRow } from '../models/user';
import Guest, { GuestRow } from '../models/guest';
type ControllerFunction = (req: Request, res: Response) => void;

class UserController {

     createUser:ControllerFunction=async(req, res) => {
        try {
          // console.log(req.body);
          
          // const body:CreateUserDTO =req.body as CreateUserDTO; 
          // if(body.pass.length<8||body.login.length<5){
          //   console.warn("invalid data reg");
            
          //   return res.status(400).json("invalid data");
          // }
          // const tokens = await this.userService.createUser(body);
          res.send("tokens");
          
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }
      otp:ControllerFunction=async(req, res) => {
        try {
          console.log(req.body);
          
          const body =req.body as {email:string}; 
          if(!body.email){
            console.warn("invalid email");
            
            return res.status(400).json("invalid email");
          }
          const otp = await mailRepo.generate(body.email);
          if(otp){
            mailService.sendMessage(body.email,otp)
          }
          res.send("tokens");
          
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }

      

      verifyOtp:ControllerFunction=async(req, res) => {
        try {
          console.log(req.body);
          
          const body =req.body as {email:string,otp:string};
          if(!body.email|| !body.otp){
            console.warn("invalid email");
            
            return res.status(400).json("invalid email");
          }
          const isVerify = await mailRepo.verify(body.email,body.otp);
          if(isVerify){
            const tokens= await UserService.authUser(body.email);
            res.send(tokens);
          }else{
            res.status(400).send("неверный код");
          }
          
          
        } catch (error) { 
          console.log(error);
          
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
          const info=await UserService.requestsInfo(token);
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
      refresh:ControllerFunction=async(req, res) => {
        try {
          const {token} = req.body as {token:string};
          console.log(token);
          
          if(!token){
            res.status(400).send("no token");
          }
           jwt.refreshVerify(token);
          const tokens= await UserService.refresh(token);
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
      profile:ControllerFunction=async(req, res) => {
        try {
          const token = req.headers.authorization;
          console.log(token);
          
          if(!token){
           return res.status(400).send("no token");
          }
           jwt.refreshVerify(token);
          const userDto= await UserService.profile(token);
          return res.send(userDto);
        } catch (error) { 
          console.log(error);
          if(error instanceof GuestControllerError){
            res.status(error.statusCode).send(null);
            return;
          }
          res.status(500).send(error);
        }
      }
      find:ControllerFunction=async(req, res) => {
        try {
          const token = req.headers.authorization;
          console.log(token);
          
          if(!token){
           return res.status(401).send("no token");
          }
          const {login}=req.query
          console.log(login);
          if(!login){
            return res.status(400).send("no login");
           }
          
          
           jwt.accessVerify(token);
          const userDto= await UserService.find(login as string);
          console.log(userDto);
          if(!userDto){
            return res.send("empty");
          }
          return res.send(userDto);
        } catch (error) { 
          console.log(error);
          if(error instanceof GuestControllerError){
            res.status(error.statusCode).send(null);
            return;
          }
          res.status(500).send(error);
        }
      }
      checkUnreadMessages:ControllerFunction=async(req, res) => {
        try {
          const token = req.headers.authorization;
          console.log(token);
          
          if(!token){
           return res.status(401).send("no token");
          }
          const tokenRepo=await jwt.getPayloadInAccess(token)
           console.log(tokenRepo);
           
           if(!tokenRepo){
            return res.status(401).send("неавтор");
           }
           let user:User|Guest|null;
           let messages:UnreadMessages[];
           if(tokenRepo["type"]=="user"){
              user =await User.findOne({
                where:{
                  [UserRow.login]:tokenRepo.sub,
                }
              })
              if(!user){
                return res.status(401).send("неавтор");
              }
              messages = await UnreadMessages.findAll({
                where:{
                  [UnreadMessagesRow.user_id]:user.id
                }
              })
            }else if(tokenRepo["type"]=="guest"){
              user =await Guest.findOne({
                where:{
                  [GuestRow.deviceId]:tokenRepo.sub,
                }
              })
              if(!user){
                return res.status(401).send("неавтор");
              }
              messages = await UnreadMessages.findAll({
                where:{
                  [UnreadMessagesRow.guest_id]:user.id
                }
              })
            }else{
              return res.status(401).send("неавтор");
            }
            await UnreadMessages.destroy({
              where:{
                [UnreadMessagesRow.guest_id]:user.id
              }
            })
            return res.send(messages);
        
          
          
        } catch (error) { 
          console.log(error);
          if(error instanceof GuestControllerError){
            res.status(error.statusCode).send(null);
            return;
          }
          res.status(500).send(error);
        }
      }
      
}

export default new UserController()
