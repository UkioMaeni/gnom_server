import User,{UserRow} from "../models/user";
import { EGuestControllerErrorType, GuestControllerError } from "../service/customError/customError";
import crypto from 'crypto';


class UserRepo{
    async getUser(login:string,):Promise<User|null>{
        try {
            
            const user= await User.findOne({
                where:{[UserRow.login]:login },
            });
            
            return user;
            
        } catch (error) {
            console.log(error);
             throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
        }
    }
    async createUser(email:string,):Promise<User>{
        try {
            let newLogin=this.generateLogin()
            let unique=false;
            while(!unique){
               const finding= await User.findOne({
                    where:{
                        [UserRow.login]:newLogin
                    }
                })
                if(!finding){
                    unique=true;
                }else{
                    newLogin=this.generateLogin()
                }
            }
            const user= await User.findOrCreate({
                where:{[UserRow.email]:email },
                defaults:{
                    [UserRow.email]:email,
                    [UserRow.nickname]:"USER 1234",
                    [UserRow.login]:newLogin,
                }
            });
            
            return user[0];
            
        } catch (error) {
            console.log(error);
             throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
        }
    }
    private generateLogin():string{
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        digits.sort(() => crypto.randomInt(2) - 1);
        const OTP = digits.slice(0, 7).join('');
        return OTP;
    }
}

export default new UserRepo();