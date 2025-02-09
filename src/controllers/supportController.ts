import { Request, Response } from 'express';
import mailRepo from "../repositoryes/mailCodeRepo"
import mailService from "../service/mailer/mailer"
import UserService from "../service/userService"
import { GuestControllerError } from '../service/customError/customError';
import jwt from '../service/JWT/jwt';
import UnreadMessages, { UnreadMessagesRow } from '../models/unreadMessages';
import User, { UserRow } from '../models/user';
import Guest, { GuestRow } from '../models/guest';
import { sendBotSupport } from '../service/tgBot/tgBot';
type ControllerFunction = (req: Request, res: Response) => void;

class Supportontroller {

     request:ControllerFunction=async(req, res) => {
        try {
          console.log(req.body);
          
          const {name,email,subject,problem} =req.body as {name:string,email:string,subject:string,problem:string}; 
          
          res.send("ok").status(200);
          const text:string=name+" обратился с темой \n\""+subject+"\"и проблемой:\n"+problem+"\n\nemail для связи: "+email;
          sendBotSupport(text);
          return;
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }
      
}

export default new Supportontroller()
