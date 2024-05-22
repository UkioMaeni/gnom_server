import GuestTokens,{GuestTokensRow} from "../models/guest_tokens";

class GuestTokenRepo{
    async saveToken(token:string,deviceId:string):Promise<number>{
        try {
            await GuestTokens.destroy({
                where:{
                    [GuestTokensRow.deviceId]:deviceId
                }
            })
            await GuestTokens.create({
                [GuestTokensRow.token]:token,
                [GuestTokensRow.deviceId]:deviceId
            });
            return 0;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateToken(token:string,deviceId:string):Promise<number>{
        try {
            await GuestTokens.update(
                {
                    [GuestTokensRow.token]:token,
                },
                {
                    where:{
                        [GuestTokensRow.deviceId]:deviceId
                    }
                }
            );
            return 0;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getToken(id:number):Promise<string|null>{
        try {
           const item= await GuestTokens.findOne({
                where:{
                    [GuestTokensRow.id]:id
                }
            });
            if(!item){
                return null;
            }
            return item.token;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async checkToken(deviceId:string,token:string):Promise<boolean>{
        try {
            console.log(deviceId);

            
           const item= await GuestTokens.findOne({
                where:{
                    [GuestTokensRow.deviceId]:deviceId
                }
            });
            console.log(item);
            if(!item){
                return false;
            }

            return item.token==token;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
}

export default new GuestTokenRepo();