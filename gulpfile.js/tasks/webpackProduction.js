if(!GULP_CONFIG.tasks.js) return

var webpackConfig = require('../lib/webpack-multi-config')('production')
var gulp          = require('gulp')
var logger        = require('../lib/compileLogger')
var webpack       = require('webpack')

var webpackProductionTask = function(callback) {
  webpack(webpackConfig, function(err, stats) {
    logger(err, stats)
    callback()
  })
}

gulp.task('webpack:production', webpackProductionTask)
module.exports = webpackProductionTask
