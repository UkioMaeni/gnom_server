import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum FCMRow{
    id="id",
    token="token",
    user_id="user_id",
    guest_id="guest_id",
}
class FCM extends Model{
    declare id:number;
    declare token:string;
    declare user_id:number;
    declare guest_id:string;
}
FCM.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            unique:false,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique:false,
            allowNull: true,
        },
        guest_id: {
            type: DataTypes.STRING,
            unique:false,
            allowNull: true,
        },
        
    },
    {
        
        tableName:"fcm",
        sequelize
    }
    )

  export default  FCM;