var gulp = require('gulp')
var log = require('fancy-log')
var colors = require('ansi-colors')
var path = require('path')
var merge = require('merge-stream')

gulp.task('init-config', function() {
  var configStream = gulp.src(['./path-config.json', './task-config.js'])
    .pipe(gulp.dest(path.join(process.env.PWD, 'config')))

  log(colors.green('Adding default path-config.json and task-config.js files to ./config/'))

  return configStream
})
