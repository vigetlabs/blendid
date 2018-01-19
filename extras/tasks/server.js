var compress    = require('compression')
var config      = require('../config')
var express     = require('express')
var gulp        = require('gulp')
var log         = require('fancy-log')
var colors      = require('ansi-colors')
var logger      = require('morgan')
var open        = require('open')
var projectPath = require('../lib/projectPath')


var settings = {
  root: projectPath(config.root.dest),
  port: process.env.PORT || 5000,
  logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
  staticOptions: {
    extensions: ['html'],
    maxAge: '31556926'
  }
}

var serverTask = function() {
  var url = 'http://localhost:' + settings.port

  express()
    .use(compress())
    .use(logger(settings.logLevel))
    .use('/', express.static(settings.root, settings.staticOptions))
    .listen(settings.port)

  log('production server started on ' + colors.green(url))
  open(url)
}

gulp.task('server', serverTask)
module.exports = serverTask
