var gulp         = require('gulp')
var sizereport   = require('gulp-sizereport')
var projectPath  = require('../lib/projectPath')

gulp.task('size-report', function() {
  return gulp.src([projectPath(PATH_CONFIG.dest, '**/*'), '*!rev-manifest.json'])
    .pipe(sizereport({
      gzip: true
    }))
})
