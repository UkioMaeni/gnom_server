import User, { UserRow } from "../models/user";
import UserRequests,{UserRequestsRow} from "../models/userRequests";
import { EGuestControllerErrorType, GuestControllerError } from "../service/customError/customError";

class UserRequestsRepo{
    // async updateRequests(userId:number,):Promise<UserRequests>{
    //     try {
    //         const guestRequsts= await UserRequests.findOrCreate({
    //            where:{[UserRequestsRow.guestId]: guestId},
    //            defaults:{
    //             [UserRequestsRow.userId]: userId,
    //             [UserRequestsRow.math]: 40,
    //             [UserRequestsRow.referre]: 40,
    //             [UserRequestsRow.essay]: 40,
    //             [UserRequestsRow.presentation]: 40,
    //             [UserRequestsRow.reduction]: 40,
    //             [UserRequestsRow.paraphrase]: 40
    //            }
    //         });
    //         return guestRequsts[0];
    //     } catch (error) {
    //         console.log(error);
    //          throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
    //     }
    // }
    async requestsInfo(login:string,):Promise<UserRequests>{
        try {
            const user=await User.findOne({
                where:{
                    [UserRow.login]:login
                }
            })
            if(!user){
                throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
            }
            const guestRequsts= await UserRequests.findOrCreate({
                where:{[UserRequestsRow.userId]: user.id},
                defaults:{
                 [UserRequestsRow.userId]: user.id,
                 [UserRequestsRow.math]: 10,
                 [UserRequestsRow.referre]: 10,
                 [UserRequestsRow.essay]: 10,
                 [UserRequestsRow.presentation]: 10,
                 [UserRequestsRow.reduction]: 10,
                 [UserRequestsRow.paraphrase]: 10,
                 [UserRequestsRow.sovet]: 10,
                 [UserRequestsRow.generation]: 10
                }
             });
            return guestRequsts[0];
        } catch (error) {
            console.log(error);
             throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
        }
    }
    async removeRequestForType(login:string,requestType: string ):Promise<boolean>{
        try {
            const requests=await this.requestsInfo(login);
            if(requestType=="parafrase"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.paraphrase]:requests.paraphrase-1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="math"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.math]:requests.math-1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="referat"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.referre]:requests.referre-1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="essay"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.essay]:requests.essay-1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="presentation"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.presentation]:requests.presentation-1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="reduce"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.reduction]:requests.reduction-1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="sovet"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.sovet]:requests.sovet-1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="generation"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.generation]:requests.generation-1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
            return true;
          } catch (error) {
              console.log(error);
              throw error;
          }
      }
      async addRequestForType(deviceId:string,requestType: string ):Promise<boolean>{
        try {
            const requests=await this.requestsInfo(deviceId);
            if(requestType=="parafrase"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.paraphrase]:requests.paraphrase+1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="math"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.math]:requests.math+1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="referat"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.referre]:requests.referre+1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="essay"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.essay]:requests.essay+1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="presentation"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.presentation]:requests.presentation+1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="reduce"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.reduction]:requests.reduction+1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="sovet"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.sovet]:requests.sovet+1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
              if(requestType=="generation"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.generation]:requests.generation+1
                    },
                    {
                        where:{
                            [UserRequestsRow.userId]:requests.userId
                        }
                    }
                );
              }
            return true;
          } catch (error) {
              console.log(error);
              throw error;
          }
      }
    
}

export default new UserRequestsRepo();