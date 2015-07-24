var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var config           = require('../../config/iconFont');
var generateIconSass = require('./generateIconSass');
var handleErrors     = require('../../lib/handleErrors');

gulp.task('iconFont', function() {
  return gulp.src(config.src)
    .pipe(iconfont(config.options))
    .on('glyphs', generateIconSass)
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});
