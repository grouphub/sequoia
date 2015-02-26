// Libraries.
var Promise = require('bluebird');

// Route definition.
module.exports = function (req, res) {
  // Query Mongo for plans.
  req.database.get().plans.find()
    .then(function (results) {
      return new Promise(function (resolve, reject) {
        res.send(JSON.stringify({
          plans: results
        }));

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

