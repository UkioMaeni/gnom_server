import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';


    export enum MailCodeRow{
        mail="mail",
        code="code",
    }
    class MailCode extends Model{
        declare mail:string;
        declare code:string;
    }
    MailCode.init(
        {   
            mail: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            
        },
        {
            
            tableName:"mail_code",
            sequelize
        }
    )


  export default  MailCode;