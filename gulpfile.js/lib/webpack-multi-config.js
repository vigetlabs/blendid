'use strict';

if (!TASK_CONFIG.javascripts) {
  return
}

let path = require('path')
let pathToUrl = require('./pathToUrl')
let webpack = require('webpack')
let webpackManifest = require('./webpackManifest')
let _object = require('lodash/object');

module.exports = function (env) {
  let jsSrc = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.javascripts.src)
  let jsDest = path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.javascripts.dest)
  let publicPath = pathToUrl(TASK_CONFIG.javascripts.publicPath || PATH_CONFIG.javascripts.dest, '/')

  let extensions = TASK_CONFIG.javascripts.extensions.map(function (extension) {
    return '.' + extension
  })

  var rev = TASK_CONFIG.production.rev && env === 'production'
  var filenamePattern = rev ? '[name]-[hash].js' : '[name].js'

  // TODO: To work in < node 6, prepend process.env.PWD + node_modules/babel-preset- to each
  // Attach default babel loader config to webpack
  let babelLoader = {
    test: new RegExp(`(\\${TASK_CONFIG.javascripts.extensions.join('$|\\.')}$)`),
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: TASK_CONFIG.javascripts.babel || {
      presets: ['es2015', 'stage-1']
    }
  };

  // if custom babel loader config is present extend the given configuration
  if (TASK_CONFIG.javascripts.babelLoader !== undefined) {
    babelLoader = _object.assign(babelLoader, TASK_CONFIG.javascripts.babelLoader);
  }

  let webpackConfig = {
    context: jsSrc,
    output: {},
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin()
    ],
    resolve: {
      root: jsSrc,
      extensions: [''].concat(extensions),
      alias: TASK_CONFIG.javascripts.alias,
      fallback: path.resolve(process.env.PWD, 'node_modules')
    }, // See https://github.com/facebook/react/issues/4566
    resolveLoader: {
      fallback: path.resolve(process.env.PWD, 'node_modules')
    },
    module: {
      loaders: [babelLoader]
    }
  }

  // Add additional loaders from config
  webpackConfig.module.loaders = webpackConfig.module.loaders.concat(TASK_CONFIG.javascripts.loaders || [])

  // Provide global objects to imported modules to resolve dependencies (e.g. jquery)
  if (TASK_CONFIG.javascripts.provide) {
    webpackConfig.plugins.push(new webpack.ProvidePlugin(TASK_CONFIG.javascripts.provide))
  }

  if (env === 'development') {
    webpackConfig.devtool = TASK_CONFIG.javascripts.devtool || 'eval-cheap-module-source-map'
    webpackConfig.output.pathinfo = true

    // Create new entries object with webpack-hot-middleware and react-hot-loader (if enabled)
    if (!TASK_CONFIG.javascripts.hot || TASK_CONFIG.javascripts.hot.enabled !== false) {
      for (var key in TASK_CONFIG.javascripts.entries) {
        var entry = TASK_CONFIG.javascripts.entries[key]
        // TODO: To work in < node 6, prepend process.env.PWD + node_modules/
        const entries = []
        let middleware = 'webpack-hot-middleware/client?'

        if (!TASK_CONFIG.javascripts.hot || TASK_CONFIG.javascripts.hot.reload !== false) {
          middleware += '&reload=true'
        }

        if (TASK_CONFIG.javascripts.hot && TASK_CONFIG.javascripts.hot.noInfo) {
          middleware += '&noInfo=true'
        }

        if (TASK_CONFIG.javascripts.hot && TASK_CONFIG.javascripts.hot.quiet) {
          middleware += '&quiet=true'
        }

        if (TASK_CONFIG.javascripts.hot && TASK_CONFIG.javascripts.hot.react) {
          entries.push('react-hot-loader/patch')
        }

        TASK_CONFIG.javascripts.entries[key] = entries.concat(middleware).concat(entry)
      }


      webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    // Addtional loaders for dev
    webpackConfig.module.loaders = webpackConfig.module.loaders.concat(TASK_CONFIG.javascripts.developmentLoaders || [])
  }

  if (env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = TASK_CONFIG.javascripts.entries

    webpackConfig.output.path = path.normalize(jsDest),
      webpackConfig.output.filename = filenamePattern,
      webpackConfig.output.publicPath = publicPath

    if (TASK_CONFIG.javascripts.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      )
    }

    // Additional loaders for tests
    webpackConfig.module.loaders = webpackConfig.module.loaders.concat(TASK_CONFIG.javascripts.testLoaders || [])
  }

  if (env === 'production') {
    if (rev) {
      webpackConfig.plugins.push(new webpackManifest(PATH_CONFIG.javascripts.dest, PATH_CONFIG.dest))
    }
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    )

    // Additional loaders for production
    webpackConfig.module.loaders = webpackConfig.module.loaders.concat(TASK_CONFIG.javascripts.productionLoaders || [])
  }

  return webpackConfig
};
