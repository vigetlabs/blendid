var browserSync = require('browser-sync')
var config      = require('../config')
var gulp        = require('gulp')
var path        = require('path')

var settings = {
  server: {
    baseDir: path.resolve(config.root.dest, config.tasks.html.dest)
  }
}

if(config.tasks.html.watchOnly) {
  settings.files = config.tasks.html.watchOnly
}

gulp.task('browserSync', function() {
  return browserSync(settings)
})
