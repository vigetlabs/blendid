if(global.production) return

var browserSync       = require('browser-sync')
var gulp              = require('gulp')
var webpack           = require('webpack')
var webpackMultiConfig = require('../lib/webpack-multi-config')
var pathToUrl         = require('../lib/pathToUrl')
var path              = require('path')

var browserSyncTask = function() {

  var webpackConfig = webpackMultiConfig('development')
  var compiler = webpack(webpackConfig)
  var proxyConfig = TASK_CONFIG.browserSync.proxy || null;

  if (typeof proxyConfig === 'string') {
    TASK_CONFIG.browserSync.proxy = {
      target : proxyConfig
    }
  }

  // Resolve path from PWD
  if(TASK_CONFIG.browserSync.server && TASK_CONFIG.browserSync.server.baseDir) {
    TASK_CONFIG.browserSync.server.baseDir = path.resolve(process.env.PWD, TASK_CONFIG.browserSync.server.baseDir)
  }

  // Resolve files from PWD
  if(TASK_CONFIG.browserSync.files) {
    TASK_CONFIG.browserSync.files = TASK_CONFIG.browserSync.files.map(function(glob) {
      return path.resolve(process.env.PWD, glob)
    })
  }

  var server = TASK_CONFIG.browserSync.proxy || TASK_CONFIG.browserSync.server;

  server.middleware = server.middleware || [
    require('webpack-dev-middleware')(compiler, {
      stats: 'errors-only',
      watchOptions: TASK_CONFIG.browserSync.watchOptions || {},
      publicPath: pathToUrl('/', webpackConfig.output.publicPath)
    }),
    require('webpack-hot-middleware')(compiler)
  ].concat(server.extraMiddlewares || [])

  browserSync.init(TASK_CONFIG.browserSync)
}

gulp.task('browserSync', browserSyncTask)
module.exports = browserSyncTask
