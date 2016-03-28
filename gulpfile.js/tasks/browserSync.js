if(global.production) return

var browserSync       = require('browser-sync')
var gulp              = require('gulp')
var webpack           = require('webpack')
var webpackMutiConfig = require('../lib/webpack-multi-config')
var config            = require('../config')

var browserSyncTask = function() {

  var webpackConfig = webpackMutiConfig('development')
  var compiler = webpack(webpackConfig)

  var proxy = config.tasks.browserSync.proxy || null;
  if (typeof(proxy) === 'string') {
    config.tasks.browserSync.proxy = proxy = {
      target : proxy
    }
  }

  var server = proxy || config.tasks.browserSync.server;
  server.middleware = [
    require('webpack-dev-middleware')(compiler, {
      stats: 'errors-only',
      publicPath: '/' + webpackConfig.output.publicPath
    }),
    require('webpack-hot-middleware')(compiler)
  ]

  browserSync.init(config.tasks.browserSync)
  
}

gulp.task('browserSync', browserSyncTask)
module.exports = browserSyncTask
