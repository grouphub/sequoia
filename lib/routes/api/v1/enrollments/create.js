// Libraries.
var _ = require('underscore');
var Promise = require('bluebird');

// Route definition.
module.exports = function (req, res) {
  setTimeout(function () {
    res.send('');
  }, 2500);
};

