var gulp             = require('gulp');
var imagemin         = require('gulp-imagemin');
var svgstore         = require('gulp-svgstore');
var config           = require('../config/svg-sprite');

gulp.task('svg-sprite', function() {
  return gulp.src(config.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(config.dest));
});
