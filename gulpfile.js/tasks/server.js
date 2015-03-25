var gulp     = require('gulp');
var express  = require('express');
var config   = require('../config/server');
var gutil    = require('gulp-util');
var compress = require('compression');
var logger   = require('morgan');
var open     = require('open');

gulp.task('server', function() {
  var url = 'http://localhost:' + config.port;

  express()
    .use(compress())
    .use(logger(config.logLevel))
    .use('/', express.static(config.root, config.staticOptions))
    .listen(config.port)

  gutil.log('production server started on ' + gutil.colors.green(url));
  open(url);
});
