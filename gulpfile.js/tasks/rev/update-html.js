if(!TASK_CONFIG.html) return false

var gulp        = require('gulp')
var revReplace  = require('gulp-rev-replace')
var projectPath = require('../../lib/projectPath')

// 4) Update asset references in HTML
gulp.task('update-html', function(){
  var manifest = gulp.src(projectPath(PATH_CONFIG.dest, "rev-manifest.json"))
  return gulp.src(projectPath(PATH_CONFIG.dest, PATH_CONFIG.html.dest, '**/*.html'))
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest(projectPath(PATH_CONFIG.dest, PATH_CONFIG.html.dest)))
})
