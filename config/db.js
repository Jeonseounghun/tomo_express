const mysql = require("mysql");

const db = mysql.createPool({
  host: "54.180.80.224",
  port: "3306",
  user: "datahive",
  password: "mobile1!",
  database: "tomo",
});

module.exports = db;
