'use strict'

if (!TASK_CONFIG.javascripts) {
  return
}

const path            = require('path')
const pathToUrl       = require('./pathToUrl')
const webpack         = require('webpack')
const webpackManifest = require('./webpackManifest')
const querystring     = require('querystring')

module.exports = function (env) {

  process.env['BABEL_ENV'] = process.env['BABEL_ENV'] || process.env['NODE_ENV'] || env

  const jsSrc = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.javascripts.src)
  const jsDest = path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.javascripts.dest)
  const publicPath = pathToUrl(TASK_CONFIG.javascripts.publicPath || PATH_CONFIG.javascripts.dest, '/')
  const extensions = TASK_CONFIG.javascripts.extensions || ['js', 'jsx', 'json']

  const rev = TASK_CONFIG.production.rev && env === 'production'

  // Attach default babel loader config to webpack
  const webpackConfig = {
    context: jsSrc,
    output: {},
    plugins: [],
    resolve: {
      extensions: extensions.map(ext => `.${ext}`),
      alias: TASK_CONFIG.javascripts.alias,
      modules: [jsSrc, path.resolve(process.env.PWD, 'node_modules')],
    },
    module: {
      rules: [
        // Default Babel Loader Config
        Object.assign({
          test: new RegExp(`(\\${extensions.join('$|\\.')}$)`),
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: TASK_CONFIG.javascripts.babel || {
            presets: ['es2015', 'stage-1']
          }
        }, TASK_CONFIG.javascripts.babelLoader || {})
      ]
    }
  }

  // Provide global objects to imported modules to resolve dependencies (e.g. jquery)
  if (TASK_CONFIG.javascripts.provide) {
    webpackConfig.plugins.push(new webpack.ProvidePlugin(TASK_CONFIG.javascripts.provide))
  }

  if (env === 'development') {
    webpackConfig.devtool = TASK_CONFIG.javascripts.devtool || 'eval-cheap-module-source-map'
    webpackConfig.output.pathinfo = true

    // Create new entries object with webpack-hot-middleware and react-hot-loader (if enabled)
    if (!TASK_CONFIG.javascripts.hot || TASK_CONFIG.javascripts.hot.enabled !== false) {
      for (let key in TASK_CONFIG.javascripts.entries) {
        const entries = []

        const hotOptions = Object.assign({
          reload: true,
          noInfo: true,
          quiet: true
        }, TASK_CONFIG.javascripts.hot || {})

        const hotMiddleware = `webpack-hot-middleware/client?${querystring.stringify(hotOptions)}`

        if (hotOptions.react) {
          entries.push('react-hot-loader/patch')
        }

        TASK_CONFIG.javascripts.entries[key] = entries.concat(hotMiddleware, TASK_CONFIG.javascripts.entries[key])
      }

      webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    }
  }

  if (env !== 'test') {
    const filenamePattern = rev ? '[name]-[hash].js' : '[name].js'

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
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    )
  }


  // Add defined plugins and loaders for all environments
  if( TASK_CONFIG.javascripts.plugins ) {
    webpackConfig.plugins = webpackConfig.plugins.concat(TASK_CONFIG.javascripts.plugins(webpack) || [])
  }
  webpackConfig.module.rules = webpackConfig.module.rules.concat(TASK_CONFIG.javascripts.loaders || [])


  // Additional plugins and loaders according to environment
  if ( TASK_CONFIG.javascripts[env] ) {
    if( TASK_CONFIG.javascripts[env].plugins ) {
      webpackConfig.plugins = webpackConfig.plugins.concat(TASK_CONFIG.javascripts[env].plugins(webpack) || [])
    }
    webpackConfig.module.rules = webpackConfig.module.rules.concat(TASK_CONFIG.javascripts[env].loaders || [])
  }

  return webpackConfig
}
