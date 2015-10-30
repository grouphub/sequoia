// Libraries.
var _ = require('underscore');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

// Route definition.
module.exports = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (_(email).isEmpty()) {
    res.status(401);
    res.send({
      error: 'Email must be provided.'
    });
    return;
  }

  if (_(password).isEmpty()) {
    res.status(401);
    res.send({
      error: 'Password must be provided.'
    });
    return;
  }

  // Query for user
  req.database.get().users.findOne({
    email: email
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

        if (!bcrypt.compareSync(password, user.password)) {
          res.status(401);
          res.send({
            error: 'Password does not match.'
          });

          return;
        }

        req.session.user = user;

        res.send(JSON.stringify({
          user: user
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

