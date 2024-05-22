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
                [GuestRequestsRow.math]: 40,
                [GuestRequestsRow.referre]: 40,
                [GuestRequestsRow.essay]: 40,
                [GuestRequestsRow.presentation]: 40,
                [GuestRequestsRow.reduction]: 40,
                [GuestRequestsRow.paraphrase]: 40
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
                 [GuestRequestsRow.paraphrase]: 40
                }
             });
            return guestRequsts[0];
        } catch (error) {
            console.log(error);
             throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
        }
    }
    
}

export default new GuestRequestsRepo();