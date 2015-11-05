'use strict';

var Q = require('q');
var faker = require('faker');
var connection = require('./../database');
var _ = require('lodash');


var maxUsers = 100000;

console.log('Start seeding ' + maxUsers + ' users...');
console.time('seeding');

var users = [];

for (var i = 0 ; i < maxUsers ; i++) {
    users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber()
    });
}

var done_users = _.reduce(users, function(prev, user) {

    return prev.then(function() {
        console.log("Inserting user: %s", user.name);
        return Q.Promise(function(resolve, reject) {
            connection.query('INSERT INTO users SET ?', user, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    });

}, Q.when());

Q.when(done_users).then(function() {
    console.timeEnd('seeding');
});