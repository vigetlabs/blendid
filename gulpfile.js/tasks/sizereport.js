var gulp         = require('gulp')
var repeatString = require('../lib/repeatString')
var dest         = require('../lib/dest')
var sizereport   = require('gulp-sizereport')

gulp.task('size-report', function() {
    return gulp.src([dest() + '**/*', '*!rev-manifest.json'])
    .pipe(sizereport({
      gzip: true
    }))
})
