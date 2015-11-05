'use strict';

var express = require('express');
var app = express();

var connection = require('./database');

require('./seed');

var server = app.listen(3333, function () {
    console.log('server listening at http://localhost:3333');
});

app.get('/users', function(req, res) {

    res.set('Content-Type', 'text/csv');
    res.set('Content-Disposition', 'attachment; filename=file.csv');

    var header = 'Name,Email,Phone\n';
    res.write(header);

    var query = connection.query('SELECT * FROM users LIMIT 300000');

    query
        .on('error', function(err) {
            console.log(err);
        })
        .on('result', function(row) {
            var data = row.name + ',' + row.email + ',' + row.phone + '\n';
            res.write(data);
        })
        .on('end', function() {
            res.end();
        });
});