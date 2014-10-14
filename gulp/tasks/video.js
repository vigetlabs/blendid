var gulp       = require('gulp');
var config     = require('../config').video;

gulp.task('video', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

gulp.task('video:dist', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dist));
});
