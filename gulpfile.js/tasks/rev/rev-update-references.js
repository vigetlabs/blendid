var gulp        = require('gulp')
var revReplace  = require('gulp-rev-replace')
var projectPath = require('../../lib/projectPath')

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function(){
  var manifest = gulp.src(projectPath(PATH_CONFIG.dest, "rev-manifest.json"))

  return gulp.src(projectPath(PATH_CONFIG.dest,'**/**.{css,js}'))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(PATH_CONFIG.dest))
})
