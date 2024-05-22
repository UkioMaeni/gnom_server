import UserTokens,{UserTokensRow} from "../models/user_tokens";

class UserTokenRepo{
    async saveToken(token:string,id:number):Promise<number>{
        try {
            const tokenFind = await UserTokens.findOne({
                where:{
                    [UserTokensRow.userId]:id,
                }
            })
            if(tokenFind){
               await tokenFind.destroy();
            }
            await UserTokens.create({
                [UserTokensRow.userId]:id,
                [UserTokensRow.token]:token
            });
            return 0;
        } catch (error) {
            console.log(error);
            return -1;
        }
    }
    async getToken(id:number):Promise<string|null>{
        try {
           const item= await UserTokens.findOne({
                where:{
                    [UserTokensRow.userId]:id
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
    async checkToken(userId:number,token:string):Promise<boolean>{
        try {
            console.log(userId);
            console.log(token);
            
           const item= await UserTokens.findOne({
                where:{
                    [UserTokensRow.userId]:userId
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
    async updateToken(token:string,userId:number):Promise<number>{
        try {
            console.log(token);
            
            await UserTokens.update(
                {
                    [UserTokensRow.token]:token,
                },
                {
                    where:{
                        [UserTokensRow.userId]:userId
                    }
                }
            );
            return 0;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new UserTokenRepo();