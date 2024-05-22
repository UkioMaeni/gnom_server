import path from "path";
import FastAPIService from "../generationLibraryAPI/http"
import FormData from 'form-data';
import fs from 'fs';
import Transaction,{TransactionRow} from "../../models/transaction";
import { randomUUID } from "crypto";
class SubjectService{
    async math(file:Express.Multer.File|undefined,text:string|undefined,lang:string){
        if(file){
            const uuid= randomUUID();
            await this.createTransaction(uuid);
            const formdata=new FormData()
            const newFilePath = path.join(__dirname,`${Date.now()}.png`);
            fs.writeFileSync(newFilePath, file.buffer)
            formdata.append("image_with_example ",fs.createReadStream(newFilePath));
            formdata.append("lang",lang);
            formdata.append("transaction_id ",uuid);
            FastAPIService.sendMathSolutuin(formdata)
        }  
    }

    private async createTransaction(transactionId:string){
        await Transaction.create({
            [TransactionRow.uuid]:transactionId,
            [TransactionRow.status]:"wait",
        })
    }

}

export default new SubjectService();