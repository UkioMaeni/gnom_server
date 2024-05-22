import User, { UserRow } from "../models/user";
import UserRequests,{UserRequestsRow} from "../models/userRequests";
import { EGuestControllerErrorType, GuestControllerError } from "../service/customError/customError";

class UserRequestsRepo{
    // async updateRequests(userId:number,):Promise<GuestRequests>{
    //     try {
    //         const guestRequsts= await GuestRequests.findOrCreate({
    //            where:{[GuestRequestsRow.guestId]: guestId},
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
                 [UserRequestsRow.paraphrase]: 10
                }
             });
            return guestRequsts[0];
        } catch (error) {
            console.log(error);
             throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
        }
    }
    
}

export default new UserRequestsRepo();