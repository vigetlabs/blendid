var gulp = require('gulp');
var config = require('../config').markup;

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.build));
});

gulp.task('markup:dist', ['clean:dist'], function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dist));
});
