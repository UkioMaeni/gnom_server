import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';
import User from "./user";


export enum UserRequestsRow{
    id="id",
    userId="userId",
    math="math",
    referre="referre",
    essay="essay",
    presentation="presentation",
    reduction="reduction",
    paraphrase="paraphrase",
    sovet="sovet",
    generation="generation"
}
class UserRequests extends Model{
    declare id:number;
    declare userId:string;
    declare math:number;
    declare referre:number;
    declare essay:number;
    declare presentation:number;
    declare reduction:number;
    declare paraphrase:number;
    declare sovet:number;
    declare generation:number;
}
UserRequests.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references:{
                model:User,
                key:"id"
            },
        },
        math: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        referre: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        essay: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        presentation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reduction: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paraphrase: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sovet: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        generation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        
        tableName:"user_requests",
        sequelize
    }
    )

  export default  UserRequests;