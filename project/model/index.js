const mysql = require('mysql');

let conn;
const connect = () => {
  if (conn === undefined) {
    conn = mysql.createConnection({
        user: "root",
        password: "inguk0504",
        database: "login"
    })
    conn.connect()
  }

  return conn
};

module.exports.connect = connect;

