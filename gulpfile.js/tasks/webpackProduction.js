if(!TASK_CONFIG.javascripts) return

var gulp    = require('gulp')
var logger  = require('../lib/compileLogger')
var webpack = require('webpack')

var webpackProductionTask = function(callback) {

  var webpackConfig = require('../lib/webpack-multi-config')('production')

  webpack(webpackConfig, function(err, stats) {
    logger(err, stats)
    callback()
  })
}

gulp.task('webpack:production', webpackProductionTask)
module.exports = webpackProductionTask
