gulp = require 'gulp'
stylus = require 'gulp-stylus'
nib = require 'nib'
handleErrors = require '../util/handleErrors'
config = require('../config').styles

gulp.task 'styles', ['images'], ->
  gulp.src(config.src)
  .pipe(stylus(
    use: nib(),
    compress: true
    sourcemap:
      inline: true
      sourceRoot: '..'
      basePath: 'styles'
  )).on('error', handleErrors)
  .pipe gulp.dest(config.dest)
