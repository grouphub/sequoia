// Libraries.
var Promise = require('bluebird');

// Route definition.
module.exports = function (req, res) {
  req.session.user = undefined;

  res.send(JSON.stringify({
    user: undefined
  }));
};

