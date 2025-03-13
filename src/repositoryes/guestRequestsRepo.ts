import Guest, { GuestRow } from "../models/guest";
import GuestRequests,{GuestRequestsRow} from "../models/guest_requests";
import { EGuestControllerErrorType, GuestControllerError } from "../service/customError/customError";

class GuestRequestsRepo{
    async updateRequests(guestId:number,):Promise<GuestRequests>{
        try {
            const guestRequsts= await GuestRequests.findOrCreate({
               where:{[GuestRequestsRow.guestId]: guestId},
               defaults:{
                [GuestRequestsRow.guestId]: guestId,
                [GuestRequestsRow.math]: 1,
                [GuestRequestsRow.referre]: 1,
                [GuestRequestsRow.essay]: 1,
                [GuestRequestsRow.presentation]: 1,
                [GuestRequestsRow.reduction]: 1,
                [GuestRequestsRow.paraphrase]: 1,
                [GuestRequestsRow.sovet]: 1,
                [GuestRequestsRow.generation]: 1
               }
            });
            return guestRequsts[0];
        } catch (error) {
            console.log(error);
             throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
        }
    }
    async requestsInfo(deviceId:string,):Promise<GuestRequests>{
        try {
            const guest=await Guest.findOne({
                where:{
                    [GuestRow.deviceId]:deviceId
                }
            })
            if(!guest){
                throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
            }
            const guestRequsts= await GuestRequests.findOrCreate({
                where:{[GuestRequestsRow.guestId]: guest.id},
                defaults:{
                 [GuestRequestsRow.guestId]: guest.id,
                 [GuestRequestsRow.math]: 40,
                 [GuestRequestsRow.referre]: 40,
                 [GuestRequestsRow.essay]: 40,
                 [GuestRequestsRow.presentation]: 40,
                 [GuestRequestsRow.reduction]: 40,
                 [GuestRequestsRow.paraphrase]: 40,
                 [GuestRequestsRow.sovet]: 40,
                 [GuestRequestsRow.generation]: 40
                }
             });
            return guestRequsts[0];
        } catch (error) {
            console.log(error);
             throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
        }
    }
    async removeRequestForType(deviceId:string,requestType: string ):Promise<boolean>{
        try {
            const requests=await this.requestsInfo(deviceId);
            if(requestType=="parafrase"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.paraphrase]:requests.paraphrase-1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="math"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.math]:requests.math-1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="referat"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.referre]:requests.referre-1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="essay"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.essay]:requests.essay-1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="presentation"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.presentation]:requests.presentation-1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="reduce"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.reduction]:requests.reduction-1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="sovet"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.sovet]:requests.sovet-1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="generation"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.generation]:requests.generation-1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
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
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.paraphrase]:requests.paraphrase+1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="math"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.math]:requests.math+1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="referat"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.referre]:requests.referre+1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="essay"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.essay]:requests.essay+1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="presentation"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.presentation]:requests.presentation+1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="reduce"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.reduction]:requests.reduction+1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="sovet"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.sovet]:requests.sovet+1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
                        }
                    }
                );
              }
              if(requestType=="generation"){
                await GuestRequests.update(
                    {
                        [GuestRequestsRow.generation]:requests.generation+1
                    },
                    {
                        where:{
                            [GuestRequestsRow.guestId]:requests.guestId
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

export default new GuestRequestsRepo();