var assign       = require('object-assign');
var config       = require('../config/webpack')(process.env.NODE_ENV == 'production' ? 'production' : 'development');
var gulp         = require('gulp');
var logger       = require('../lib/compileLogger');
var webpack      = require('webpack');
var browserSync  = require('browser-sync');

gulp.task('webpack', function(callback) {
  var built = false;

  if (process.env.NODE_ENV == 'production') {
    webpack(config, function(err, stats) {
      logger(err, stats);
      callback();
    });
  } else {
    webpack(config).watch(200, function(err, stats) {
      logger(err, stats)
      browserSync.reload()
        // On the initial compile, let gulp know the task is done
      if (!built) {
        built = true;
        callback()
      }
    });
  }
});
