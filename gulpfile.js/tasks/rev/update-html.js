if(!TASK_CONFIG.html) return false

var gulp       = require('gulp')
var dest       = require('../../lib/dest')
var revReplace = require('gulp-rev-replace')
var path       = require('path')

// 5) Update asset references in HTML
gulp.task('update-html', function(){
  var src = PATH_CONFIG.html.dest;
  var destination = PATH_CONFIG.html.dest;

  if( PATH_CONFIG.production && PATH_CONFIG.production.rev ) {
    src = PATH_CONFIG.production.rev.src
    destination = PATH_CONFIG.production.rev.dest
  }

  var manifest = gulp.src(dest("rev-manifest.json"))
  return gulp.src(dest(path.join(src, '**/*.html')))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(dest(destination)))
})
