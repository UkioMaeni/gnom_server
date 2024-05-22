import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum GuestRow{
    id="id",
    deviceId="deviceId",
}
class Guest extends Model{
    declare id:number;
    declare deviceId:string;
}
Guest.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        deviceId: {
            type: DataTypes.STRING,
            unique:true,
            allowNull: false,
        },
        
    },
    {
        
        tableName:"guest",
        sequelize
    }
    )

  export default  Guest;