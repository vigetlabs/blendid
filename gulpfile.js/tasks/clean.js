var gulp   = require('gulp')
var del    = require('del')
var config = require('../config')
var path   = require('path')
var gutil  = require("gulp-util")

gulp.task('clean', function (cb) {
  var files = [path.join(config.root.dest, 'rev-manifest.json')]
  for(var key in config.tasks) {
    var task = config.tasks[key]
    var filePattern = path.join(config.root.dest, task.dest, '**/*.{' + task.extensions.join(',') + ',map}')
    files.push(filePattern)
  }
  del(files).then(function (paths) {
    cb()
  })
})
