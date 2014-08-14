changed = require 'gulp-changed'
gulp = require 'gulp'
imagemin = require 'gulp-imagemin'

gulp.task 'images', ->
  dest = './build/images'
  # Ignore unchanged files
  # Optimize
  gulp.src('./src/images/**').pipe(changed(dest)).pipe(imagemin()).pipe gulp.dest(dest)
