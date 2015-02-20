var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('default', function(cb) {
  var development = [['iconFont', 'images'], ['sass', 'watchify'], 'html', 'watch', cb ];
  var production  = ['karma', 'clean', 'build', ['minifyCss', 'uglifyJs'], 'rev', cb];
  var tasks       = (process.env.NODE_ENV === 'production') ? production : development;
  gulpSequence.apply(this, tasks);
});
