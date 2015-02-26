// Libraries.
var _ = require('underscore');

// Application Code.
var config = require('../config');

// Route definition.
module.exports = function (req, res) {
  var user;

  if (req.originalUrl.match(/\.\w+$/)) {
    res.status(404).end();
    return;
  }

  user = (req.session && req.session.user) ? _(req.session.user).omit('password') : null;

  res.render('index', {
    title: config.title,
    environment: config.environment,
    user: user
  });
};

