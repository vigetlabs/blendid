var browserSync = require('browser-sync')
var config      = require('../config')
var gulp        = require('gulp')
var path        = require('path')

gulp.task('browserSync', function() {
  return browserSync(config.tasks.browserSync)
})
