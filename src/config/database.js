import dotenv from 'dotenv';
dotenv.config();
import Sequelize from "sequelize";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.MYSQL_HOST, 
    port: process.env.MYSQL_PORT, 
    username: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,  
    database: process.env.MYSQL_DATABASE,
    logging: false,
    pool: {
      max: 5, // Maximum number of connection pool connections
      min: 0, // Minimum number of connection pool connections
      acquire: 30000, // Maximum time (ms) to wait for a connection
      idle: 10000, // Maximum time (ms) a connection can remain idle
    },
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
    }
});

export default sequelize;
