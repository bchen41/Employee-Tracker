const util = require("util");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  // "localhost" gave connection errors, but "127.0.0.1" works
  host: "127.0.0.1",
  // username
  user: "root",
  // password
  password: "password",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
});

connection.query = util.promisify(connection.query);

module.exports = connection;
