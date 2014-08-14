browserSync = require 'browser-sync'
gulp = require 'gulp'

gulp.task 'browserSync', ['build'], ->
  browserSync.init ['build/**'],
    server:
      baseDir: [
        'build'
        'src'
      ]