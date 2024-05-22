import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';


    export enum SubjectRow{
        transactionId="transactionId",
        status="status",
    }
    class Subject extends Model{
        declare transactionId:string;
        declare status:string;
    }
    Subject.init(
        {   
            transactionId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            
        },
        {
            
            tableName:"subject_transaction",
            sequelize
        }
    )


  export default  Subject;