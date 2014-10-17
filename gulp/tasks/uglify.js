var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config     = require('../config').uglify;

gulp.task('uglify:dist', ['build', 'clean:dist'], function() {
  return gulp.src(config.build)
    .pipe(uglify(config.options || {}))
    .pipe(gulp.dest(config.dist))
});
