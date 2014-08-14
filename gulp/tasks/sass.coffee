gulp = require 'gulp'
sass = require 'gulp-ruby-sass'
handleErrors = require '../util/handleErrors'
browserSync = require 'browser-sync'

gulp.task 'sass', ['images'], ->
  gulp.src('src/sass/*.{sass, scss}').pipe(sass(
    compass: true
    bundleExec: true
    sourcemap: true
    sourcemapPath: '../sass'
  )).on('error', handleErrors).pipe gulp.dest('build')
