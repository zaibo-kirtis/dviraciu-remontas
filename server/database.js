let mysql = require('mysql');
let config = require('../config');

let db = mysql.createConnection(config.mysql);

db.connect();

module.exports = db;