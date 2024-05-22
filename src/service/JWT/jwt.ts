import JWT, { JwtPayload } from 'jsonwebtoken';
import tokenRepo from "../../repositoryes/userTokenRepo"
class JWTTools{
    
    accessVerify=(token:string):boolean=>{
        try {
            const key= process.env.ACCESS_TOKEN;
            if(!key){
                throw new Error("no access key");
            }
          const result=  JWT.verify(token,key);
          if(!result){
            return false;
          }
          return true;
        } catch (error) {
            console.log(error);
            return false;
        }
       
    }
    refreshVerify=(token:string):boolean=>{
        try {
            const key= process.env.REFRESH_TOKEN;
            if(!key){
                throw new Error("no refresh key");
            }
          const result=  JWT.verify(token,key);
          if(!result){
            return false;
          }
          return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    generateAccessToken=(id:number|string):string=>{
        try {
            const key= process.env.ACCESS_TOKEN;
            if(!key){
                throw new Error("no access key");
            }
            return JWT.sign({"sub":id}, key, { expiresIn: '15m' });
        } catch (error) {
            throw error;
        }
    } 
    generateRefreshToken=(id:number|string):string=>{
        try {
            const key= process.env.REFRESH_TOKEN;
            if(!key){
                throw new Error("no refresh key");
            }
            return JWT.sign({"sub":id}, key, { expiresIn: '14d' });
        } catch (error) {
            throw error;
        }
    }
    getPayloadInRefresh=(token:string):JwtPayload=>{
        try {
            const key= process.env.REFRESH_TOKEN;
            if(!key){
                throw new Error("no refresh key");
            }
            return JWT.verify(token,key) as JwtPayload;
        } catch (error) {
            throw error;
        }
    }
    getPayloadInAccess=(token:string):JwtPayload=>{
        try {
            const key= process.env.ACCESS_TOKEN;
            if(!key){
                throw new Error("no refresh key");
            }
            return JWT.verify(token,key) as JwtPayload;
        } catch (error) {
            throw error;
        }
    }
    
    
}

export default new JWTTools();