var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:production', function(cb) {
  gulpSequence('clean', ['fonts', 'iconFont', 'images', 'svg-sprite'], ['sass', 'webpack:production'], 'html', 'rev', cb);
});
