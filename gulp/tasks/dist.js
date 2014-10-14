var gulp = require('gulp');
var config = require('../config').dist;

gulp.task('dist', ['watch', 'build', 'compress', 'images:dist', 'video:dist', 'minify-css'], function () {
  return gulp.src(config.src + "/index.html")
    .pipe(gulp.dest(config.dest));
});
