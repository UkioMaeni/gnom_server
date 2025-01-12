import path from "path";
import FastAPIService from "../generationLibraryAPI/http"
import fs from 'fs';
import Transaction,{TransactionRow} from "../../models/transaction";
import { randomUUID } from "crypto";
class SubjectService{
    async math(file:Express.Multer.File|undefined,text:string|undefined,lang:string,transaction:string):Promise<number>{
        if(file){
            const formdata=new FormData()
            const newFilePath = path.join(__dirname,file.originalname);
             fs.writeFileSync(newFilePath,file.buffer);
             const imageData = fs.readFileSync(newFilePath);
             const base64ImageData = Buffer.from(imageData,);
             const blob = new Blob([base64ImageData], { type: 'image/jpeg' });
            formdata.append("image_with_example",blob,"file.jpg");
            formdata.append("lang",lang);
            formdata.append("transaction_id",transaction);
            
            
            
            const result= await FastAPIService.sendMathSolutuin(formdata)
            return result;
        }
        return -1;
    }
    async paraphrasingText(file:Express.Multer.File|undefined,text:string|undefined,lang:string):Promise<string>{
        if(file){
            
            const formdata=new FormData()
            const newFilePath = path.join(__dirname,file.originalname);
            fs.writeFileSync(newFilePath,file.buffer);
            const imageData = fs.readFileSync(newFilePath);
             const base64ImageData = Buffer.from(imageData)
             const blob = new Blob([base64ImageData], { type: 'image/jpeg' });
            formdata.append("content_type","image");
            formdata.append("content",blob,"file.jpg");
            formdata.append("lang",lang);
            formdata.append("is_handwritten","false");
            const result= await FastAPIService.sendParafraseText(formdata)

            return result;
        }
        if(text){
            console.log("TEXT");
            const formdata=new FormData()
            formdata.append("content_type","string");
            formdata.append("lang",lang);
            formdata.append("content",text);
            formdata.append("is_handwritten","false");
            console.log(formdata);
            return await FastAPIService.sendParafraseText(formdata)
        }  
        return "";
    }
    async referat(file:Express.Multer.File|undefined,text:string|undefined,lang:string,transaction:string):Promise<number>{
        if(text){
            console.log("TEXT");
            const formdata=new FormData()
            formdata.append("topic",text);
            formdata.append("lang",lang);
            formdata.append("count_chapters_for_abstract",'4');
            formdata.append("transaction_id",transaction);
            console.log(formdata);
            return await FastAPIService.sendReferat(formdata)
        }  
        return -1;
    }
    async essay(file:Express.Multer.File|undefined,text:string|undefined,lang:string,transaction:string):Promise<string>{
        if(text){
            console.log("TEXT");
            const formdata=new FormData()
            formdata.append("topic",text);
            formdata.append("lang",lang);
            formdata.append("transaction_id",transaction);
            console.log(formdata);
            return await FastAPIService.sendEssay(formdata)
        }  
        return "";
    }
    async presentation(file:Express.Multer.File|undefined,text:string|undefined,lang:string,transaction:string):Promise<number>{
        console.log(lang);
        
        if(text){
            console.log("TEXT");
            const formdata=new FormData()
            formdata.append("topic",text);
            formdata.append("lang",lang);
            formdata.append("transaction_id",transaction);
            formdata.append("template_number",'1');
            console.log(formdata);
            return FastAPIService.sendPresentation(formdata)
        }  
        return -1;
    }
    async reduce(file:Express.Multer.File|undefined,text:string|undefined,lang:string):Promise<string>{
        if(file){
            const formdata=new FormData()
            const newFilePath = path.join(__dirname,file.originalname);
             fs.writeFileSync(newFilePath,file.buffer);
             const imageData = fs.readFileSync(newFilePath);
             const base64ImageData = Buffer.from(imageData);
             const blob = new Blob([base64ImageData], { type: 'image/jpeg' });
            formdata.append("content_type","image");
            formdata.append("content",blob,"file.jpg");
            formdata.append("lang",lang);
            formdata.append("is_handwritten","false");
            return await FastAPIService.sendReduce(formdata)
        }
        if(text){
            console.log("TEXT");
            const formdata=new FormData()
            formdata.append("content_type","string");
            formdata.append("lang",lang);
            formdata.append("content",text);
            formdata.append("is_handwritten","false");
            console.log(formdata);
            return await FastAPIService.sendReduce(formdata)
        }  
        return ""
    }
    async sovet(file:Express.Multer.File|undefined,text:string|undefined,lang:string):Promise<string>{
        if(text){
            console.log("TEXT");
            const formdata=new FormData()
            formdata.append("lang",lang);
            formdata.append("user_question",text);
            console.log(formdata);
            return await FastAPIService.sendSovet(formdata)
        }  
        return "";
    }
    async generation(file:Express.Multer.File|undefined,text:string|undefined,lang:string,transaction:string):Promise<string>{
        if(text){
            console.log("TEXT");
            const formdata=new FormData()
            formdata.append("prompt",text);
            formdata.append("lang",lang);
            formdata.append("transaction_id",transaction);
            console.log(formdata);
            return await FastAPIService.generation(formdata)
        }  
        return "";
    }
    

}

export default new SubjectService();