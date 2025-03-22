import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';


export enum PaymentTransactionsRow{
    id="id",
    orderId="orderId",
    status="status",
    userId="userId",
    terminalPaymentId="terminalPaymentId"
}
class PaymentTransactions extends Model{
    declare id:number;
    declare orderId:string;
    declare status:string;
    declare userId:number;
    declare terminalPaymentId:string;
}
PaymentTransactions.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.NUMBER,
            allowNull: false,
            
        },
        terminalPaymentId: {
            type: DataTypes.NUMBER,
            allowNull: false,
            
        },
    },
    {
        
        tableName:"payment_transactions",
        sequelize
    }
    )

  export default  PaymentTransactions;