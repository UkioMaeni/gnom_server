import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';
import Guest from "./guest";


export enum GuestTokensRow{
    id="id",
    token="token",
    deviceId="deviceId"
}
class GuestTokens extends Model{
    declare id:number;
    declare token:string;
    declare deviceId:string;
}
GuestTokens.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        deviceId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            references:{
                model:Guest,
                key:"deviceId"
            }
        },
        token:{
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
    {
        
        tableName:"guest_tokens",
        sequelize
    }
    )

  export default  GuestTokens;