import GuestRepo from "../repositoryes/guestRepo";
import GuestRequestsRepo from "../repositoryes/guestRequestsRepo";
import GuestTokenRepo from "../repositoryes/guestTokenRepo";
import AppError, { EGuestControllerErrorType, GuestControllerError } from "./customError/customError";
import jwtTool from "../service/JWT/jwt";
import GuestRequests from "../models/guest_requests";
class GuestService{
    guestRepo=GuestRepo;
    guestTokenRepo=GuestTokenRepo;
    guestRequestsRepo=GuestRequestsRepo;
    async authGuest(deviceId:string ):Promise<{ accessToken: string; refreshToken: string; }>{
        try {
            const guest= await this.guestRepo.createGuest(deviceId);
            const accessToken= jwtTool.generateAccessToken(deviceId,"guest");
            const refreshToken= jwtTool.generateRefreshToken(deviceId,"guest");
            const result=await this.guestTokenRepo.saveToken(refreshToken,deviceId);
            await this.guestRequestsRepo.updateRequests(guest.id)
            return {accessToken,refreshToken}
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async refresh(token:string ):Promise<{ accessToken: string; refreshToken: string; }>{
        try {
              if(!jwtTool.refreshVerify(token)){
                throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
              }
              const payload = jwtTool.getPayloadInRefresh(token);
              const deviceId =   payload.sub;
              if(!deviceId){
                throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
              }
              const isAuth =await this.guestTokenRepo.checkToken(deviceId,token);
              if(!isAuth){
                throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
              }
            const accessToken= jwtTool.generateAccessToken(deviceId,"guest");
            const refreshToken= jwtTool.generateRefreshToken(deviceId,"guest");
            const result=await this.guestTokenRepo.updateToken(refreshToken,deviceId);
            return {accessToken,refreshToken}
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async requestsInfo(token:string ):Promise<GuestRequests>{
      try {
        const payload = jwtTool.getPayloadInAccess(token);
        const deviceId =   payload.sub;
        if(!deviceId){
          throw new GuestControllerError("invalid token",EGuestControllerErrorType.invalidToken,401);
        }
          
          return await this.guestRequestsRepo.requestsInfo(deviceId)
      } catch (error) {
          console.log(error);
          throw error;
      }
  }
  async isAvailable(deviceId:string,requestType: string ):Promise<boolean>{
      try {
          const guestRequests=  await this.guestRequestsRepo.requestsInfo(deviceId);
          if(requestType=="parafrase"){
            return guestRequests.paraphrase > 0;
          }
          if(requestType=="math"){
            return guestRequests.math > 0;
          }
          if(requestType=="referat"){
            return guestRequests.referre > 0;
          }
          if(requestType=="essay"){
            return guestRequests.essay > 0;
          }
          if(requestType=="presentation"){
            return guestRequests.presentation > 0;
          }
          if(requestType=="reduce"){
            return guestRequests.reduction > 0;
          }
          if(requestType=="sovet"){
            return guestRequests.sovet > 0;
          }
          if(requestType=="generation"){
            return guestRequests.generation > 0;
          }
          return false
      } catch (error) {
          console.log(error);
          throw error;
      }
  }
  async removeRequestForType(deviceId:string,requestType: string ):Promise<boolean>{
    try {
        return await this.guestRequestsRepo.removeRequestForType(deviceId,requestType)
    }catch(error){
      console.log(error);
            throw error;
    }
  }
  async addRequestForType(deviceId:string,requestType: string ):Promise<boolean>{
    try {
        return await this.guestRequestsRepo.addRequestForType(deviceId,requestType)
    }catch(error){
      console.log(error);
            throw error;
    }
  }
    
}

export default new GuestService();
