if(!TASK_CONFIG.html) return false

var gulp       = require('gulp')
var revReplace = require('gulp-rev-replace')
var path       = require('path')

// 5) Update asset references in HTML
gulp.task('update-html', function(){
  var manifest = gulp.src(path.resolve(process.env.PWD, PATH_CONFIG.dest, "rev-manifest.json"))
  return gulp.src(path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest, '**/*.html'))
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest(path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest)))
})
