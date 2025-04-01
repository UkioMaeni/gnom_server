import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';


export enum UserNotifyRow{
    id="id",
    userId="userId",
    notifyType="notifyType",
    notifyInfo="notifyInfo",
    status="status",
}

//status NEW,READ
class UserNotify extends Model{
    declare id:number;
    declare userId:number;
    declare notifyType:string;
    declare notifyInfo:string;
    declare status:string;
}
UserNotify.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        notifyType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        notifyInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        
        tableName:"user_notify",
        sequelize
    }
    )

  export default  UserNotify;