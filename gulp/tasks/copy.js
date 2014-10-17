var gulp = require('gulp');
var config     = require('../config').vendor;

gulp.task('vendor', function() {
  return gulp.src(config.src, { base: config.base })
    .pipe(gulp.dest(config.build));
});

gulp.task('vendor:dist', ['clean:dist'], function() {
  return gulp.src(config.src, { base: config.base })
    .pipe(gulp.dest(config.dist));
});
