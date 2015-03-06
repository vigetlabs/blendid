var gulp   = require('gulp');
var config = require('../config');
var watch  = require('gulp-watch');

gulp.task('watch', ['build', 'watchify', 'browserSync'], function(callback) {
  watch(config.images.src, function() { gulp.start('images'); });
  watch(config.sass.src, function() { gulp.start('sass'); });
  watch(config.iconFont.src, function() { gulp.start('iconFont'); });
  watch(config.html.watch, function() { gulp.start('html'); });
});
