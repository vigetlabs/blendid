var gulp     = require('gulp');
var html     = require('../config/html');
var iconFont = require('../config/iconFont');
var images   = require('../config/images');
var sass     = require('../config/sass');
var fonts    = require('../config/fonts');
var vendor   = require('../config/vendor');
var watch    = require('gulp-watch');

gulp.task('watch', ['browserSync'], function() {
  watch(images.src, function() { gulp.start('images'); });
  watch(sass.src, function() { gulp.start('sass'); });
  watch(iconFont.src, function() { gulp.start('iconFont'); });
  watch(fonts.src, function() { gulp.start('fonts'); });
  watch(vendor.src, function() { gulp.start('vendor'); });
  watch(html.watch, function() { gulp.start('html'); });
});
