// Libraries.
var Promise = require('bluebird');
var mongo = require('mongod');
var bcrypt = require('bcrypt-nodejs');

// Application code.
var config = require('./config');

function log (message) {
  return new Promise(function (resolve, reject) {
    console.log(message);
    resolve();
  });
}

// =========
// Seed data
// =========

var plans = [
  {
    name: 'First Plan'
  }
];

var users = [
  {
    email: 'admin@grouphub.io',
    password: bcrypt.hashSync('testtest')
  }
];

var database = mongo(config.databaseUrl, config.databaseTables);

// Performs the following steps:
//
//   * Remove existing users.
//   * Remove existing users.
//   * Seed the new plans.
//   * Seed the new users.
//   * Manually close the database to prevent the script from hanging.
//
Promise.resolve()
  .then(log('Dropping existing plans...'))
  .then(database.plans.remove())
  .then(log('Dropping existing users...'))
  .then(database.users.remove())
  .then(log('Inserting new plans...'))
  .then(database.plans.insert(plans))
  .then(log('Inserting new users...'))
  .then(database.users.insert(users))
  .then(log('Closing the database...'))
  .catch(function (error) {
    console.error(error);
  })
  .then(function () {
    database.close()
  });

