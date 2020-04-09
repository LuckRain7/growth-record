/*
 *  Description:
 *  Author: LuckRain7
 *  Date: 2020-04-07 22:45:13
 */

const mysql = require("mysql");

// 链接
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "juejin",
});

connection.connect();

// query 是执行SQL语句的意思，并非仅仅用来查询
connection.query("SELECT 1+1", function (error, result, fields) {
  console.log(error);
  console.log(result);
  console.log(fields);
});

// 爬虫3 07:14
