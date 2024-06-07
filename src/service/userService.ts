import UserRepo from "../repositoryes/userRepo";
import UserRequestsRepo from "../repositoryes/userRequestsRepo";
import UserTokenRepo from "../repositoryes/userTokenRepo";
import AppError, { EGuestControllerErrorType, GuestControllerError } from "./customError/customError";
import jwtTool from "./JWT/jwt";
import UserRequests from "../models/userRequests";
import User, { UserRow } from "../models/user";
import {UserDTO} from "../dto/userDto"
class UserService{
    userRepo=UserRepo;
    userTokenRepo=UserTokenRepo;
    userRequestsRepo=UserRequestsRepo;
    async authUser(email:string ):Promise<{ accessToken: string; refreshToken: string; }>{
        try {
            const user= await this.userRepo.createUser(email);
            const accessToken= jwtTool.generateAccessToken(user.login);
            const refreshToken= jwtTool.generateRefreshToken(user.login);
            const result=await this.userTokenRepo.saveToken(refreshToken,user.id);
            //await this.guestRequestsRepo.updateRequests(guest.id)
            return {accessToken,refreshToken}
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async requestsInfo(token:string ):Promise<UserRequests>{
      try {
        const payload = jwtTool.getPayloadInAccess(token);
        const login =   payload.sub;
        if(!login){
          throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
        }
          
          return await this.userRequestsRepo.requestsInfo(login)
      } catch (error) {
          console.log(error);
          throw error;
      }
    }
    async refresh(token:string ):Promise<{ accessToken: string; refreshToken: string; }>{
      try {
            // if(!jwtTool.refreshVerify(token)){
            //   throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
            // }
            const payload = jwtTool.getPayloadInRefresh(token);
            const login =   payload.sub;
            if(!login){
              throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
            }
            const user= await this.userRepo.getUser(login);
            if(!user){
              throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,400);
            }
            const isAuth =await this.userTokenRepo.checkToken(user.id,token);
            if(!isAuth){
              throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
            }
          const accessToken= jwtTool.generateAccessToken(login);
          const refreshToken= jwtTool.generateRefreshToken(login);
          const result=await this.userTokenRepo.updateToken(refreshToken,user.id);
          return {accessToken,refreshToken}
      } catch (error) {
          console.log(error);
          throw error;
      }
    }
    async profile(token:string ):Promise<UserDTO>{
      try {
            if(!jwtTool.accessVerify(token)){
              throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
            }
            const payload = jwtTool.getPayloadInAccess(token);
            const login =   payload.sub;
            if(!login){
              throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
            }
            const user= await this.userRepo.getUser(login);
            if(!user){
              throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,400);
            }
            return {id:user.id,login:user.login,nickname:user.nickname}
      } catch (error) {
          console.log(error);
          throw error;
      }
    }
    async find(login:string ):Promise<UserDTO|null>{
      try {
            const user=await User.findOne({
              where:{
                [UserRow.login]:login
              }
            })
            if(user){
              return {id:user.id,login:user.login,nickname:user.nickname}
            }
            return null
      } catch (error) {
          console.log(error);
          throw error;
      }
    }
    // async refresh(token:string ):Promise<{ accessToken: string; refreshToken: string; }>{
    //     try {
    //           if(!jwtTool.refreshVerify(token)){
    //             throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
    //           }
    //           const payload = jwtTool.getPayloadInRefresh(token);
    //           const deviceId =   payload.sub;
    //           if(!deviceId){
    //             throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
    //           }
    //           const isAuth =await this.guestTokenRepo.checkToken(deviceId,token);
    //           if(!isAuth){
    //             throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
    //           }
    //         const accessToken= jwtTool.generateAccessToken(deviceId);
    //         const refreshToken= jwtTool.generateRefreshToken(deviceId);
    //         const result=await this.guestTokenRepo.updateToken(refreshToken,deviceId);
    //         return {accessToken,refreshToken}
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }
    
    
}

export default new UserService();
