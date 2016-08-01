if(!TASK_CONFIG.fonts) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')

var fontsTask = function() {

  var paths = {
    src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.assets.fonts.src, '**/*.{' + TASK_CONFIG.fonts.extensions + '}'),
    dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.assets.fonts.dest)
  }

  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('fonts', fontsTask)
module.exports = fontsTask
