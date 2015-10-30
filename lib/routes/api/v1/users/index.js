// Libraries.
var Promise = require('bluebird');
var _ = require('underscore');

// Route definition.
module.exports = function (req, res) {
  // Query Mongo for users.
  req.database.get().users.find()
    .then(function (results) {
      return new Promise(function (resolve, reject) {
        var users = {
          users: _(results).map(function (result) {
            return _(result).omit('password');
          })
        };

        res.send(JSON.stringify({
          users: users
        }));

        resolve();
      });
    })
    .then(function () {
      return new Promise(function (resolve, reject) {
        resolve();
      });
    })
    .catch(function (error) {
      res.status(500).end();

      console.error(error);
    })
    .then(function () {
      database.close()
    });
};

