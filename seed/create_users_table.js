'use strict';

var Q = require('q');
var connection = require('./../database');

var dropUsersTable = 'DROP TABLE IF EXISTS \`users\`;';

var usersTable = `CREATE TABLE IF NOT EXISTS \`users\` (
\`id\` int(11) NOT NULL,
\`name\` varchar(255) NOT NULL,
\`email\` varchar(255) NOT NULL,
\`phone\` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`;

var usersTablePrimaryKey = `ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`);`;
var usersTableAI = `ALTER TABLE \`users\` MODIFY \`id\` int(11) NOT NULL AUTO_INCREMENT;`;

var promise = Q.ninvoke(connection, 'query', dropUsersTable)
        .then(function() {
            return Q.ninvoke(connection, 'query', usersTable);
        })
        .then(function() {
            return Q.ninvoke(connection, 'query', usersTablePrimaryKey);
        })
        .then(function() {
            return Q.ninvoke(connection, 'query', usersTableAI);
        });

module.exports = promise;