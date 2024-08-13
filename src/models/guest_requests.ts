import sequelize from "../db/postgres/postgresDb"
import { DataTypes, Model } from 'sequelize';
import Guest from "./guest";


export enum GuestRequestsRow{
    id="id",
    guestId="guestId",
    math="math",
    referre="referre",
    essay="essay",
    presentation="presentation",
    reduction="reduction",
    paraphrase="paraphrase",
    sovet="sovet",
    generation="generation"
}
class GuestRequests extends Model{
    declare id:number;
    declare guestId:string;
    declare math:number;
    declare referre:number;
    declare essay:number;
    declare presentation:number;
    declare reduction:number;
    declare paraphrase:number;
    declare sovet:number;
    declare generation:number;

}
GuestRequests.init(
    {   
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        guestId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references:{
                model:Guest,
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
        
        tableName:"guests_requests",
        sequelize
    }
    )

  export default  GuestRequests;