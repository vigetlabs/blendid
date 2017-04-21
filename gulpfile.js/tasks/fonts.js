var config      = require('../config')
var task 		= config.tasks.fonts
if(!task) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')

var paths = {
  src: path.join(config.root.src, task.src, '/**/*.{' + task.extensions + '}'),
  dest: path.join(config.root.dest, task.dest)
}

var fontsTask = function() {
  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('fonts', fontsTask)
module.exports = fontsTask
