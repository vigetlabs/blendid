if(!GULP_CONFIG.tasks.fonts) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')

var fontsTask = function() {

  var paths = {
    src: path.join(GULP_CONFIG.root.src, GULP_CONFIG.tasks.fonts.src, '/**/*.{' + GULP_CONFIG.tasks.fonts.extensions + '}'),
    dest: path.join(GULP_CONFIG.root.dest, GULP_CONFIG.tasks.fonts.dest)
  }

  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('fonts', fontsTask)
module.exports = fontsTask
