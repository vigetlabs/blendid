// https://github.com/adityabansod/static-heroku-node/
var gulp     = require('gulp');
var express  = require('express');
var config   = require('../../config').server;
var gutil    = require('gulp-util');
var compress = require('compression');
var logger   = require('morgan');

gulp.task('server', ['production'], function(){
  express()
    .use(compress())
    .use(logger(config.logLevel))
    .use('/', express.static(config.root, config.staticOptions))
    .listen(config.port)
});
