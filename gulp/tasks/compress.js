var gulp = require('gulp');
var uglify = require('gulp-uglify');
var config     = require('../config').uglify;

gulp.task('compress', function() {
  return gulp.src(config.src)
    .pipe(uglify(config.options || {}))
    .pipe(gulp.dest(config.dest))
});
