var config  = require('../config/webpack')
var gulp    = require('gulp')
var logger  = require('../lib/compileLogger')
var webpack = require('webpack')

gulp.task('webpack:production', function(callback) {
  var prodConfig = Object.create(config)

  prodConfig.plugins = prodConfig.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ])

  webpack(prodConfig, function(err, stats) {
    logger(err, stats)
    callback()
  })
})
