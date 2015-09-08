var gulp = require('gulp');
var del = require('del');
var config = require('../config');
var path = require('path')

gulp.task('clean', function (cb) {
  del([
    path.resolve(config.dest.root),
    path.resolve(config.dest.root, config.dest.html),
    path.resolve(config.dest.root, config.dest.css, config.dest.iconFontSass)
  ], cb);
});
