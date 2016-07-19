var gulp       = require('gulp')
var revReplace = require('gulp-rev-replace')
var path       = require('path')

// 5) Update asset references in HTML
gulp.task('update-html', function(){
  var manifest = gulp.src(path.join(GULP_CONFIG.root.dest, "/rev-manifest.json"))
  return gulp.src(path.join(GULP_CONFIG.root.dest, GULP_CONFIG.tasks.html.dest, '/**/*.html'))
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(path.join(GULP_CONFIG.root.dest, GULP_CONFIG.tasks.html.dest)))
})
