import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('admin_users', process.env.MYSQL_USER!, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    logging: false
});

sequelize.authenticate().then(()=>{console.log("Mysql connected")});

export default sequelize;
