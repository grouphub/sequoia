// Libraries.
var Promise = require('bluebird');
var _ = require('underscore');
var mongo = require('mongod');

// Route definition.
module.exports = function (req, res) {
  var id = req.params.id;

  if (_(id).isEmpty()) {
    res.status(401);
    res.send({
      error: 'ID must be provided.'
    });
    return;
  }

  // Query Mongo for users.
  req.database.get().users.findOne({
    _id: new mongo.ObjectId(id)
  })
    .then(function (user) {
      return new Promise(function (resolve, reject) {
        if (!user) {
          res.status(401);
          res.send({
            error: 'Could not find a user.'
          });

          return;
        }

        res.send(JSON.stringify({
          user: _(user).omit('password')
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

