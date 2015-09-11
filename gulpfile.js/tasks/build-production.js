var config       = require('../config')
var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')

gulp.task('build:production', function(cb) {
  var assetTasks = []
  config.src.fonts     && assetTasks.push('fonts')
  config.src.iconFont  && assetTasks.push('icon-font')
  config.src.images    && assetTasks.push('images')
  config.src.svgSprite && assetTasks.push('svg-sprite')

  var codeTasks = []
  config.src.css  && codeTasks.push('sass')
  config.src.js   && codeTasks.push('webpack:production')
  config.src.html && codeTasks.push('html')

  gulpSequence('clean', assetTasks, codeTasks, 'rev', cb)
})
