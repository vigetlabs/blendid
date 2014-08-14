gulp = require 'gulp'

gulp.task 'markup', ->
  gulp.src('src/htdocs/**').pipe gulp.dest('build')
