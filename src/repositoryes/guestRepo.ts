import Guest,{GuestRow} from "../models/guest";
import { EGuestControllerErrorType, GuestControllerError } from "../service/customError/customError";

class GuestRepo{
    async createGuest(deviceId:string,):Promise<Guest>{
        try {
            const guest= await Guest.findOrCreate({
                where:{[GuestRow.deviceId]:deviceId },
                defaults:{
                    [GuestRow.deviceId]:deviceId,
                }
            });
            
            return guest[0];
            
        } catch (error) {
            console.log(error);
             throw new GuestControllerError("noCreate",EGuestControllerErrorType.noCreate,403)
        }
    }
}

export default new GuestRepo();