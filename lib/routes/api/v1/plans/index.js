// Libraries.
var _ = require('underscore');
var Promise = require('bluebird');

// Application code.
var Plans = require('../../../../plans');

// Route definition.
module.exports = function (req, res) {
  var zipcode = req.query.zipcode;
  var age = req.query.age;
  var plans = new Plans();

  if (_(zipcode).isEmpty()) {
    res.status(401);
    res.send({
      error: 'Zip code must be provided.'
    });
    return;
  }

  if (!zipcode.match(/\d\d\d\d\d/)) {
    res.status(401);
    res.send({
      error: 'Zip code must be properly formed.'
    });
    return;
  }

  if (_(age).isEmpty()) {
    res.status(401);
    res.send({
      error: 'Age code must be provided.'
    });
    return;
  }

  if (!zipcode.match(/\d+/)) {
    res.status(401);
    res.send({
      error: 'Age must be properly formed.'
    });
    return;
  }

  plans
    .fetch(zipcode, age)
    .then(function (data) {
      res.send(data);
    })
    .catch(function (err) {
      console.error(err);

      res.status(500).end();
    });
};

