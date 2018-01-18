var gulp = require('gulp')
var log = require('fancy-log')
var colors = require('ansi-colors')
var path = require('path')
var merge = require('merge-stream')

gulp.task('init', function() {
  var defaultStream = gulp.src(['../extras/default/**/*'])
    .pipe(gulp.dest(process.env.PWD))

  var configStream = gulp.src(['./path-config.json', './task-config.js'])
    .pipe(gulp.dest(path.join(process.env.PWD, 'config')))

  var srcStream = gulp.src(['../src/**/*', '*.gitkeep'])
    .pipe(gulp.dest(path.join(process.env.PWD, PATH_CONFIG.src)))

  log(colors.green('Generating default Blendid project files'))
  log(colors.yellow(`
To start the dev server:
`), colors.magenta(`
yarn run blendid
`))

  return merge(defaultStream, configStream, srcStream)
})
