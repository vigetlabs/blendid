if(!TASK_CONFIG.images) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var projectPath = require('../lib/projectPath')

var imagesTask = function() {

  var paths = {
    src: projectPath(PATH_CONFIG.src, PATH_CONFIG.images.src, '**/*.{' + TASK_CONFIG.images.extensions + '}'),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.images.dest)
  }

  return gulp.src([paths.src, , '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('images', imagesTask)
module.exports = imagesTask
