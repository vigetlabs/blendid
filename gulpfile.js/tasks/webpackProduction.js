if(!TASK_CONFIG.javascripts) return

var gulp    = require('gulp')
var logger  = require('../lib/compileLogger')
var webpack = require('webpack')

var webpackProductionTask = function(callback) {

  var webpackConfig = require('../lib/webpack-multi-config')(global.environment)

  webpack(webpackConfig, function(err, stats) {
    logger(err, stats)
    if(callback) {
      callback()
    }
  })
}

gulp.task('webpack:production', webpackProductionTask)
module.exports = webpackProductionTask
