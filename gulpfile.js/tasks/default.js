var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('default', function(cb) {
  var development = [['iconFont', 'images'], ['sass', 'html', 'watchify'], ['browserSync', 'watch'], cb ];
  var production  = ['karma', 'production', cb];
  var tasks       = (process.env.NODE_ENV === 'production') ? production : development;
  gulpSequence.apply(this, tasks);
});
