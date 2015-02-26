// Libraries.
var _ = require('underscore');
var Promise = require('bluebird');

// Route definition.
module.exports = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var passwordConfirm = req.body.password_confirm;
  var user;

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

  if (password !== passwordConfirm) {
    res.status(401);
    res.send({
      error: 'Password and password confirmation must match.'
    });
    return;
  }

  user = {
    email: email,
    password: password
  }

  // Insert user.
  req.database.get().users.insert(user)
    .then(function () {
      return new Promise(function (resolve, reject) {
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

