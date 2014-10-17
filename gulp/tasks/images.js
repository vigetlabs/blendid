var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config').images;

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.build))
    .pipe(imagemin())
    .pipe(gulp.dest(config.build));
});

gulp.task('images:dist', ['clean:dist'], function() {
  return gulp.src(config.src)
    .pipe(changed(config.dist))
    .pipe(imagemin())
    .pipe(gulp.dest(config.dist));
});
