import { Sequelize } from 'sequelize';


//const sequelize:Sequelize = new Sequelize('postgres://gnom:g_nom@localhost:5432/gnom');
const sequelize:Sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/gnom',{logging:false});
    
export default sequelize;
