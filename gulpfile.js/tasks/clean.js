var gulp   = require('gulp')
var del    = require('del')
var config = require('../config')
var path   = require('path')

gulp.task('clean', function (cb) {
  var paths = []
  for(var key in config.tasks) {
    paths.push(path.resolve(config.root.dest, config.tasks[key].dest))
  }
  del(paths, cb)
})
