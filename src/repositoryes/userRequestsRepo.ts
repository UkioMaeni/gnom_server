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
                 [UserRequestsRow.math]: 1,
                 [UserRequestsRow.referre]: 1,
                 [UserRequestsRow.essay]: 1,
                 [UserRequestsRow.presentation]: 1,
                 [UserRequestsRow.reduction]: 1,
                 [UserRequestsRow.paraphrase]: 1,
                 [UserRequestsRow.sovet]: 1,
                 [UserRequestsRow.generation]: 1
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
      async addRequestForType(deviceId:string,requestType: string,count:number=1 ):Promise<boolean>{
        try {
            const requests=await this.requestsInfo(deviceId);
            if(requestType=="parafrase"){
                await UserRequests.update(
                    {
                        [UserRequestsRow.paraphrase]:requests.paraphrase+count
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
                        [UserRequestsRow.math]:requests.math+count
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
                        [UserRequestsRow.referre]:requests.referre+count
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
                        [UserRequestsRow.essay]:requests.essay+count
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
                        [UserRequestsRow.presentation]:requests.presentation+count
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
                        [UserRequestsRow.reduction]:requests.reduction+count
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
                        [UserRequestsRow.sovet]:requests.sovet+count
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
                        [UserRequestsRow.generation]:requests.generation+count
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
      async addRequestAllType(login:string,count:number=1 ):Promise<boolean>{
        try {
            const requests=await this.requestsInfo(login);
            await UserRequests.update(
                {
                    [UserRequestsRow.paraphrase]:requests.paraphrase+count,
                    [UserRequestsRow.math]:requests.math+count,
                    [UserRequestsRow.referre]:requests.referre+count,
                    [UserRequestsRow.essay]:requests.essay+count,
                    [UserRequestsRow.presentation]:requests.presentation+count,
                    [UserRequestsRow.reduction]:requests.reduction+count,
                    [UserRequestsRow.sovet]:requests.sovet+count,
                    [UserRequestsRow.generation]:requests.generation+count,
                },
                {
                    where:{
                        [UserRequestsRow.userId]:requests.userId
                    }
                }
            );
            
            return true;
          } catch (error) {
              console.log(error);
              throw error;
          }
      }
    
}

export default new UserRequestsRepo();