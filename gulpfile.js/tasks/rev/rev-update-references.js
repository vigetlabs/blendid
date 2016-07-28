var gulp       = require('gulp')
var path       = require('path')
var revReplace = require('gulp-rev-replace')

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function(){
  var manifest = gulp.src(path.resolve(process.env.PWD, GULP_CONFIG.root.dest, "rev-manifest.json"))

  return gulp.src(path.resolve(process.env.PWD, GULP_CONFIG.root.dest,'**/**.{css,js}'))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(GULP_CONFIG.root.dest))
})
