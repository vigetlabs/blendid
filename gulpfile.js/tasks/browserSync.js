if(global.production) return

var browserSync       = require('browser-sync')
var gulp              = require('gulp')
var webpack           = require('webpack')
var webpackMutiConfig = require('../lib/webpack-multi-config')
var config            = require('../config')

var browserSyncTask = function() {

  var webpackConfig = webpackMutiConfig('development')
  var compiler = webpack(webpackConfig)

  config.tasks.browserSync.server.middleware = [
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
