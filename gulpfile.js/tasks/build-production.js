var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:production', function(cb) {
  process.env.NODE_ENV = 'production'
  gulpSequence('clean', ['iconFont', 'images'], ['sass', 'webpack:production'], 'html', cb);
});
