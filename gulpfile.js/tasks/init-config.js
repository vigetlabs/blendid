var gulp = require('gulp')
var log = require('fancy-log')
var colors = require('ansi-colors')
var projectPath = require('../lib/projectPath')
var merge = require('merge-stream')

gulp.task('init-config', function () {
  var configStream = gulp.src(['gulpfile.js/path-config.json', 'gulpfile.js/task-config.js'])
    .pipe(gulp.dest(projectPath('config')))

  log(colors.green('Adding default path-config.json and task-config.js files to ./config/'))

  return configStream
})
