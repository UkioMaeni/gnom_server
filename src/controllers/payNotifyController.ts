import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { sendBotSupport } from '../service/tgBot/tgBot';
type ControllerFunction = (req: Request, res: Response) => void;

class PayNotifyController {


  transaction:ControllerFunction=async(req, res) => {
        try {
         console.log(req.body);
         console.log(req.body);
         sendBotSupport(JSON.stringify(req.body));
         return res.status(200).send("OK");
          
        } catch (error) { 
          console.log(error);
          
          res.status(500).send("");
        }
      }
      

      
}

export default new PayNotifyController()


