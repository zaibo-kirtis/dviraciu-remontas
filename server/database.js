let mysql = require('mysql');
let config = require('../config');
let helpers = require('./helpers' );

let db = mysql.createConnection(config.mysql);
db.connect();

module.exports = {
    query: function( query, data, cb ) {
        if(typeof(data) === 'function') {
            cb = data;
            db.query( query, cb );
        } else {
            db.query( helpers.insertData( query, data ), cb );
        }
    }
};