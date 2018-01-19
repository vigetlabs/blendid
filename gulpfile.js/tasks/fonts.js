if(!TASK_CONFIG.fonts) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var projectPath = require('../lib/projectPath')


var fontsTask = function() {

  var paths = {
    src: projectPath(PATH_CONFIG.src, PATH_CONFIG.fonts.src, '**/*.{' + TASK_CONFIG.fonts.extensions + '}'),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.fonts.dest)
  }

  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('fonts', fontsTask)
module.exports = fontsTask
