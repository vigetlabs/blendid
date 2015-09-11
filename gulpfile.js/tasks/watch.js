var config = require('../config')
var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

gulp.task('watch', ['browserSync'], function() {
  var watchableTasks = ['fonts', 'iconFont', 'images', 'svgSprite','html', 'css', 'js']

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName]
    if(task) {
      var filePattern = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
      console.log(filePattern, taskName)
      watch(filePattern, function() { gulp.start(taskName) })
    }
  })
})
