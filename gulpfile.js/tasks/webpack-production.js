var config = require('../config')
if(!config.tasks.js) return

var config  = require('../lib/webpack-multi-config')('production')
var gulp    = require('gulp')
var logger  = require('../lib/compileLogger')
var webpack = require('webpack')

gulp.task('webpack:production', function(callback) {
  webpack(config, function(err, stats) {
    logger(err, stats)
    callback()
  })
})
