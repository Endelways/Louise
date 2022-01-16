const mysql = require("mysql2/promise");

require('dotenv').config();

module.exports = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: process.env.DATABASE,
    password: ""
}); 
