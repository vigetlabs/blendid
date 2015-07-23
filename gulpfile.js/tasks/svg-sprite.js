var browserSync = require('browser-sync');
var config      = require('../config/svg-sprite');
var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var svgstore    = require('gulp-svgstore');

gulp.task('svg-sprite', function() {
  return gulp.src(config.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});
