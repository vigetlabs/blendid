var config = require('../config')
if(!config.tasks.js) return

var gulp          = require('gulp')
var logger        = require('../lib/compileLogger')
var webpack       = require('webpack')
var webpackConfig = require('../lib/webpack-multi-config')

gulp.task('webpack:development', function(callback) {
  webpack(webpackConfig('development'), function(err, stats) {
    logger(err, stats)
    callback()
  })
})
