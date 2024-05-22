import { Sequelize } from 'sequelize';


const sequelize:Sequelize = new Sequelize('postgres://gnom:g_nom@localhost:5432/gnom');
     
    
export default sequelize;
