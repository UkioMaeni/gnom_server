import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';
const generateDefaultNickname=():String=>{
    const randomNumber = Math.random();
    const scaledNumber = Math.floor(randomNumber * 90000) + 10000;
    return "User"+scaledNumber;
}

export enum UserRow{
    id="id",
    login="login",
    pass="pass",
    email="email",
    nickname="nickname",
    country="country",
}
class User extends Model{
    declare id:number;
    declare login:string;
    declare pass:string;
    declare email:string;
    declare nickname:string;
    declare country:string;
}
User.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:generateDefaultNickname()
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        
        tableName:"user",
        sequelize
    }
    )

  export default  User;