'use strict';

var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'stream-test'
});

connection.connect();

module.exports = connection;