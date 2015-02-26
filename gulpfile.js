var path = require('path');
var gulp = require('gulp');
var tinylr = require('tiny-lr');
var app = require('./lib/app');
var config = require('./lib/config');

var lr;
var port = 35729;
function startLivereload () {
  lr = tinylr();
  lr.listen(port, function () {
    console.log('Livereload is listening at "http://0.0.0.0:%s".', port);
  });
}

function notifyLivereload(event) {
  var fileName = path.relative(__dirname + '/lib', event.path);

  console.log('The file "' + path.relative('.', event.path) + '" changed. Triggering browser reload.');
 
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

function startExpress () {
  app.listen(config.serverPort, function () {
    console.log('App is listening at "http://0.0.0.0:%s" in the "%s" environment.', config.serverPort, config.environment);
  });
}

gulp.task('default', function () {
  startExpress();
  startLivereload();

  gulp.watch('{public,views}/**/*.*', notifyLivereload);
});

