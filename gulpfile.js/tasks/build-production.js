var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:production', function(cb) {
  gulpSequence('karma', 'clean', ['iconFont', 'images'], ['sass', 'webpack:production'], 'html', 'rev', cb);
});
