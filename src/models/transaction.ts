import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum TransactionRow{
    id="id",
    uuid="uuid",
    user_id="user_id",
    guest_id="guest_id",
}
class Transaction extends Model{
    declare id:number;
    declare uuid:string;
    declare user_id:number|null;
    declare guest_id:string|null;
}
Transaction.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        uuid: {
            type: DataTypes.STRING,
            unique:true,
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
        
        tableName:"transactions",
        sequelize
    }
    )

  export default  Transaction;