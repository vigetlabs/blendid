var config       = require('../config')
var gulp         = require('gulp')
var repeatString = require('../lib/repeatString')
var sizereport   = require('gulp-sizereport')

gulp.task('size-report', function() {
  return gulp.src([config.root.dest + '/**/*', '*!rev-manifest.json'])
    .pipe(sizereport({
      gzip: true
    }))
})
