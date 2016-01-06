var config = require('../config')
var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

var watchTask = function() {
  var tasks = config.tasks
  for (taskName in tasks) {
    var task = tasks[taskName]
    if (task.hasOwnProperty('watch') && task.watch == true) {
      var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
      watch(glob, function() {
        require('./' + taskName)()
      })
    }
  }
}

gulp.task('watch', ['browserSync'], watchTask)
module.exports = watchTask
