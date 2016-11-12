if(global.production) return
var task              = config.tasks.browserSync

var browserSync       = require('browser-sync')
var gulp              = require('gulp')
var webpack           = require('webpack')
var webpackMultiConfig = require('../lib/webpack-multi-config')
var config            = require('../config')
var pathToUrl         = require('../lib/pathToUrl')

var browserSyncTask = function() {

  var webpackConfig = webpackMultiConfig('development')
  var compiler = webpack(webpackConfig)
  var proxyConfig = task.proxy || null;

  if (typeof(proxyConfig) === 'string') {
    task.proxy = {
      target : proxyConfig
    }
  }

  var server = task.proxy || task.server;

  server.middleware = [
    require('webpack-dev-middleware')(compiler, {
      stats: 'errors-only',
      publicPath: pathToUrl('/', webpackConfig.output.publicPath)
    }),
    require('webpack-hot-middleware')(compiler)
  ]

  browserSync.init(task)
}

gulp.task('browserSync', browserSyncTask)
module.exports = browserSyncTask
