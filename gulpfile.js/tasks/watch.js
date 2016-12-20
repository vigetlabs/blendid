var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

var watchTask = function() {
  var watchableTasks = ['fonts', 'iconFont', 'images', 'svgSprite', 'html', 'jade', 'pug', 'stylesheets', 'static']

  function getTaskPathFor(taskName) {
    switch (taskName) {
      case 'iconFont':
        return PATH_CONFIG.icons
      case 'svgSprite':
        return PATH_CONFIG.icons
      case 'html':
        return PATH_CONFIG.html
      case 'pug':
        return PATH_CONFIG.pug
      case 'jade':
        return PATH_CONFIG.jade
      case 'static':
        return PATH_CONFIG.static
      default:
        return PATH_CONFIG[taskName]
    }
  }

  watchableTasks.forEach(function(taskName) {
    var taskConfig = TASK_CONFIG[taskName]
    var taskPath = getTaskPathFor(taskName)

    if(taskConfig) {
      var glob = path.resolve(process.env.PWD, PATH_CONFIG.src, taskPath.src, '**/*.{' + taskConfig.extensions.join(',') + '}')
      watch(glob, function() {
       require('./' + taskName)()
      })
    }
  })
}

gulp.task('watch', ['browserSync'], watchTask)

module.exports = watchTask
