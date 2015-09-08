var browserSync = require('browser-sync')
var config      = require('../config')
var gulp        = require('gulp')
var path        = require('path')

var settings = {
  server: {
    baseDir: path.resolve(config.dest.root, config.dest.html)
  },
  files: [
    config.src.root + '/**/*.html'
  ]
}

gulp.task('browserSync', function() {
  return browserSync(settings)
})
