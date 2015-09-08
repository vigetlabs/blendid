var browserSync = require('browser-sync')
var config      = require('../config')
var gulp        = require('gulp')

var settings = {
  server: {
    baseDir: config.dest.root
  },
  files: [
    config.src.root + '/**/*.html'
  ]
}

gulp.task('browserSync', function() {
  return browserSync(settings)
})
