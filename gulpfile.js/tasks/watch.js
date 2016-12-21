var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

var watchTask = function() {
  var watchableTasks = ['fonts', 'iconFont', 'images', 'svgSprite', 'html', 'stylesheets', 'static']

  function getTaskPathFor(taskName) {
    switch (taskName) {
      case 'iconFont':
        return PATH_CONFIG.icons
      case 'svgSprite':
        return PATH_CONFIG.icons
      case 'html':
        return PATH_CONFIG.html
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

var preTasks = []
if (typeof TASK_CONFIG.browserSync !== "undefined") {
  preTasks.push('browserSync')
} else {
  console.info("BrowserSync must be configured in your config.json file to watch changes in your Browser")
}

gulp.task('watch', preTasks, watchTask)
module.exports = watchTask
