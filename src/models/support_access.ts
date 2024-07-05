import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum SupportAccessRow{
    id="id",
    access="access",
    user_id="user_id",
    password="password",
    wait_access="wait_access",
}
class SupportAccess extends Model{
    declare id:number;
    declare user_id:string;
    declare status:boolean;
    declare password:string;
    declare wait_access:string;
}
SupportAccess.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            unique:true,
            allowNull: true,
        },
        access: {
            type: DataTypes.BOOLEAN,
            unique:true,
            allowNull: true,
        },
        wait_access: {
            type: DataTypes.BOOLEAN,
            unique:true,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            unique:true,
            allowNull: true,
        },
        
    },
    {
        
        tableName:"support_access",
        sequelize
    }
    )

  export default  SupportAccess;