var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config').images;

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(config.dest));
});

gulp.task('images:dist', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dist))
    .pipe(imagemin())
    .pipe(gulp.dest(config.dist));
});
