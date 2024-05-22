import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum TransactionRow{
    id="id",
    uuid="uuid",
    status="status",
}
class Transaction extends Model{
    declare id:number;
    declare uuid:string;
    declare status:string;
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
        status: {
            type: DataTypes.STRING,
            unique:false,
            allowNull: false,
        },
        
    },
    {
        
        tableName:"transactions",
        sequelize
    }
    )

  export default  Transaction;