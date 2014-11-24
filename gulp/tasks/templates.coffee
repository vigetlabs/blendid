gulp = require 'gulp'
jade = require 'gulp-jade'
config = require('../config').templates
locals = {}

gulp.task 'templates', ->
  gulp.src(config.src)
  .pipe jade(
    locals: locals
  )
  .pipe gulp.dest(config.dest)
