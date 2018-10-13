var mysql = require('mysql');

var Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ekant42p_websitedb'
});

Connection.connect(function (err) {
  if (err) {
    console.log("Error Database Connection" + err);
  } else {
    console.log('Connection Created Successfully');
  }
});

module.exports = Connection;
