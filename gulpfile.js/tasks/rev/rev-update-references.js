var dest       = require('../../lib/dest')
var gulp       = require('gulp')
var path       = require('path')
var revReplace = require('gulp-rev-replace')

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function(){
  var manifest = gulp.src(dest("rev-manifest.json"))

  return gulp.src(dest('**/**.{css,js}'))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(dest()))
})
