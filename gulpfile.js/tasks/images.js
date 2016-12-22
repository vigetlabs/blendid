if(!TASK_CONFIG.images) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')
var gulpif      = require('gulp-if')
var dest        = require('../lib/dest')

var imagesTask = function() {

  var paths = {
    src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.images.src, '**/*.{' + TASK_CONFIG.images.extensions + '}'),
    dest: dest(PATH_CONFIG.images.dest)
  }

  return gulp.src([paths.src, '*!README.md'])
    // Ignore unchanged files
    .pipe(gulpif(global.environment === 'development', changed(paths.dest)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('images', imagesTask)
module.exports = imagesTask
