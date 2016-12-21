if(!TASK_CONFIG.fonts) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')
var gulpif      = require('gulp-if')
var dest        = require('../lib/dest')

var fontsTask = function() {

  var paths = {
    src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.fonts.src, '**/*.{' + TASK_CONFIG.fonts.extensions + '}'),
    dest: dest(PATH_CONFIG.fonts.dest)
  }

  return gulp.src([paths.src, '*!README.md'])
    // Ignore unchanged files
    .pipe(gulpif(global.environment === 'development', changed(paths.dest)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('fonts', fontsTask)
module.exports = fontsTask
