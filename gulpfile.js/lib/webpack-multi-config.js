var config = require('../config')
if(!config.src.js) return

var path            = require('path')
var webpack         = require('webpack')
var webpackManifest = require('./webpackManifest')

module.exports = function(env) {
  var jsSrc = path.resolve(config.src.root, config.src.js)
  var jsDest = path.resolve(config.dest.root, config.dest.js)
  var publicPath = path.join(config.src.js, '/')
  var filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js'

  var webpackConfig = {
    context: jsSrc,
    plugins: [],
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader?stage=1',
          exclude: /node_modules/
        }
      ]
    }
  }

  if(env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.src.jsEntries

    webpackConfig.output= {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath
    }

    if(config.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      )
    }
  }

  if(env === 'development') {
    webpackConfig.devtool = 'source-map'
    webpack.debug = true
  }

  if(env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest(publicPath, config.dest.root),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    )
  }

  return webpackConfig
}
