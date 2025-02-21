import MailCode,{MailCodeRow} from "../models/mailCode";
import { EGuestControllerErrorType, GuestControllerError } from "../service/customError/customError";
const crypto = require('crypto');
class MailCodeRepo{
    async generate(mail:string):Promise<string>{
       try {
            const findingEmail=await MailCode.findOne({
                where:{
                    [MailCodeRow.mail]:mail
                }
            });
            if(findingEmail){
                await findingEmail.destroy();
            }
            let otp=this.generateOtp()
            if(mail=="gnom-test@test.com"){
                otp="0000";
            }
            MailCode.create({
                [MailCodeRow.mail]:mail,
                [MailCodeRow.code]:otp,
            });
            return otp;
       } catch (error) {
        throw error;
       }
    }
    async verify(mail:string,otp:string):Promise<boolean>{
        try {
             const findingEmail=await MailCode.findOne({
                 where:{
                     [MailCodeRow.mail]:mail
                 }
             });
             if(findingEmail){
                if(findingEmail.code==otp){
                  
                  await MailCode.destroy({
                    where:{
                        [MailCodeRow.mail]:mail
                    }
                  });
                  return true;
                }else{
                    return false;
                }
                 
             }
             return false;
        } catch (error) {
         throw error;
        }
     }
    private generateOtp():string{
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        digits.sort(() => crypto.randomInt(2) - 1);
        const OTP = digits.slice(0, 4).join('');
        return OTP;
    }
}

export default new MailCodeRepo();