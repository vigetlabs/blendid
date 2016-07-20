if(!GULP_CONFIG.tasks.images) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var path        = require('path')

var imagesTask = function() {

  var paths = {
    src: path.join(GULP_CONFIG.root.src, GULP_CONFIG.tasks.images.src, '/**/*.{' + GULP_CONFIG.tasks.images.extensions + '}'),
    dest: path.join(GULP_CONFIG.root.dest, GULP_CONFIG.tasks.images.dest)
  }

  return gulp.src([paths.src, , '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('images', imagesTask)
module.exports = imagesTask
