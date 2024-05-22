import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
type ControllerFunction = (req: Request, res: Response) => void;

class UserController {


  upload:ControllerFunction=async(req, res) => {
        try {
         console.log(req.files);
         console.log(req.file);
         console.log(req.body);
         
         const file=req.file;
         if(!file){
          return res.status(500).send("error");
         }
        
          res.send("tokens");
          
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }
      

      
}

export default new UserController()
