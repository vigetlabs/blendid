var gulp         = require('gulp')
var repeatString = require('../lib/repeatString')
var sizereport   = require('gulp-sizereport')

gulp.task('size-report', function() {
  return gulp.src([GULP_CONFIG.root.dest + '**/*', '*!rev-manifest.json'])
    .pipe(sizereport({
      gzip: true
    }))
})
