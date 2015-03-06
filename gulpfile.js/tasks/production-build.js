var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('production-build', function(cb) {
  gulpSequence('karma', 'build', 'rev', cb);
});
