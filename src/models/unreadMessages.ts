import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';

export enum UnreadMessagesRow{
    id="id",
    text="text",
    subject_type="subject_type",
    message_id="message_id",
    user_id="user_id",
    guest_id="guest_id",
}
class UnreadMessages extends Model{
    declare id:number;
    declare text:string;
    declare subject_type:number;
    declare message_id:string;
    declare guser_id:string;
    declare guest_id:string;
}
UnreadMessages.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subject_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        guest_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
    },
    {
        
        tableName:"unread_messages",
        sequelize
    }
    )

  export default  UnreadMessages;