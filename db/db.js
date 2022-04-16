const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.HOST_BD,
    user: process.env.USER_BD,
    database: process.env.DATABASE_NAME,
    port: process.env.PORT_DB,
    password: process.env.PASSWORD_DB
})

module.exports = connection