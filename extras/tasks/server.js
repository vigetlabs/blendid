var compress = require('compression')
var dest   = require('../lib/dest')
var express  = require('express')
var gulp     = require('gulp')
var gutil    = require('gulp-util')
var logger   = require('morgan')
var open     = require('open')
var path     = require('path')

var serverTask = function() {
  var settings = {
    root: dest(),
    port: process.env.PORT || 5000,
    logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
    staticOptions: {
      extensions: ['html'],
      maxAge: '31556926'
    }
  }
  var url = 'http://localhost:' + settings.port

  express()
    .use(compress())
    .use(logger(settings.logLevel))
    .use('/', express.static(settings.root, settings.staticOptions))
    .listen(settings.port)

  gutil.log('server started on ' + gutil.colors.green(url))

  var browserConfig = ( TASK_CONFIG.server.browser && TASK_CONFIG.server.browser !== false );
  if( !TASK_CONFIG.server || browserConfig ) {
    if( browserConfig && typeof TASK_CONFIG.server.browser === "string" ) {
      open(url, TASK_CONFIG.server.browser)
    } else {
      open(url)
    }
  }
}

var runServerTask = function (env) {
  global.environment = env
  serverTask()
}

gulp.task('server', function() { runServerTask('production') })
gulp.task('server:production', function() { runServerTask('production') })
gulp.task('server:distribution', function() { runServerTask('distribution') })
module.exports = serverTask
