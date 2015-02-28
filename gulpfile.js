var path = require('path');
var childProcess = require('child_process');
var gulp = require('gulp');
var Promise = require('bluebird');
var tinylr = require('tiny-lr');
var app = require('./lib/app');
var config = require('./lib/config');

function portpid (port) {
  return new Promise(function (resolve, reject) {
    childProcess.exec("lsof -i :" + port + " | tail -n 1 | awk '{print $2}'", function (err, stdout, stderr) {
      var match;

      if (err) {
        reject(err);
        return;
      }

      match = stdout.match(/\d+/);
      if (match) {
        resolve([0]);
      } else {
        resolve();
      }
    });
  });
}

function kill (pid) {
  return new Promise(function (resolve, reject) {
    if (!pid) {
      resolve();
      return;
    }

    childProcess.exec('kill -9 ' + pid, function (err, stdout, stderr) {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

function fetchZips () {
  return new Promise(function (resolve, reject) {
    childProcess.exec('ruby data/fetch_zips.rb', function (err, stdout, stderr) {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

gulp.task('serve', function () {
  app.listen(config.serverPort, function () {
    console.log('App is listening at "http://0.0.0.0:%s" in the "%s" environment.', config.serverPort, config.environment);
  });
});

gulp.task('watch', function () {
  var port = 35729;
  var lr = tinylr();

  lr.listen(port, function () {
    console.log('Livereload is listening at "http://0.0.0.0:%s".', port);
  });

  gulp.watch('{public,views}/**/*.*', function (event) {
    var fileName = path.relative(__dirname + '/lib', event.path);

    console.log('The file "' + path.relative('.', event.path) + '" changed. Triggering browser reload.');
   
    lr.changed({
      body: {
        files: [fileName]
      }
    });
  });
});

gulp.task('killall', function () {
  return Promise.resolve()
    .then(function () {
      return portpid(9292)
        .then(kill)
        .then(function () {
          console.log('Killing any running servers.');
        })
        .catch(function (err) {
          console.error('Error killing server.', err); 
        })
    })
    .then(function () {
      return portpid(35729)
        .then(kill)
        .then(function () {
          console.log('Killed watcher.');
        })
        .catch(function (err) {
          console.error('Killing any running watchers.', err); 
        })
    });
});

gulp.task('fetch-zips', function () {
  return fetchZips();
});

gulp.task('default', ['serve', 'watch'], function () {

});

