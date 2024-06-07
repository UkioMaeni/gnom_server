import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';
import User from "./user";


export enum UserTokensRow{
    id="id",
    userId="userId",
    token="token",
}
class UserTokens extends Model{
    declare id:number;
    declare userId:number;
    declare token:string;
}
UserTokens.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references:{
                model:User,
                key:"id"
            }
        },
        token:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        
        tableName:"user_tokens",
        sequelize
    }
    )

  export default  UserTokens;