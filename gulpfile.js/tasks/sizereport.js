var gulp         = require('gulp')
var repeatString = require('../lib/repeatString')
var sizereport   = require('gulp-sizereport')

gulp.task('size-report', function() {
  return gulp.src([PATH_CONFIG.dest + '**/*', '*!rev-manifest.json'])
    .pipe(sizereport({
      gzip: true
    }))
})
