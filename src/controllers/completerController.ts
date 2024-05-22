import { Request, Response } from 'express';
import FormData from 'form-data';
import fastAPI from "../service/generationLibraryAPI/http"
import fs from 'fs';
import { Readable, Stream } from 'stream';
import path from 'path';

type ControllerFunction = (req: Request, res: Response) => void;

class CompleterController {


  complete:ControllerFunction=async(req, res) => {
        try {
          console.log(req.body);
          console.log(req.file);
          const file=req.file;
          const deviceId=req.body.deviceId as string;
          if(!file || !deviceId){
            return res.status(500).send("error");
           }
           const formdata=new FormData()
            const newFilePath = path.join(__dirname,`../tempFiles/${Date.now()}.png`);
            fs.writeFileSync(newFilePath, file.buffer)
            //console.log(await fs.readFile(newFilePath));
            
           formdata.append("file",fs.createReadStream(newFilePath));
           formdata.append("type","self");
           const result= await  fastAPI.sendMathSolutuin(formdata)
           if(result==0){
            fs.unlink(newFilePath,()=>{});
           }
          res.send("tokens");
        } catch (error) { 
          console.log(error);
          
          res.status(500).send(error);
        }
      }
      

      
}

export default new CompleterController()
