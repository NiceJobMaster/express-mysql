const mysql = require("mysql");
const dbConfig = require("../../config/db.config");

const db = mysql.createConnection({
  port: dbConfig.PORT,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE
});

db.connect(err => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection Db established");
});

module.exports = db;
