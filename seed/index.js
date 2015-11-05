'use strict';

var Q = require('q');

var usersTable = require('./create_users_table');

module.exports = Q.when(usersTable).then(function() {
        require('./seed_users');
    })
    .catch(function(err) {
        console.log(err);
    });