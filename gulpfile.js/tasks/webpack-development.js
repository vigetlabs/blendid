var config       = require('../config/webpack')('development')
var gulp         = require('gulp')
var logger       = require('../lib/compileLogger')
var webpack      = require('webpack')
var browserSync  = require('browser-sync')

gulp.task('webpack:development', function(callback) {
  var built = false

  if(global.watch) {
    webpack(config).watch(200, function(err, stats) {
      logger(err, stats)
      browserSync.reload()
      // On the initial compile, let gulp know the task is done
      if(!built) { built = true; callback() }
    })
  } else {
    webpack(config, function(err, stats) {
      logger(err, stats)
      callback()
    })
  }
})
