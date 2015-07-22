var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('default', function(cb) {
  global.watch = true
  gulpSequence('build:development', ['watch', 'browserSync'], cb)
});
