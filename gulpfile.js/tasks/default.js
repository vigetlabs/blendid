var gulp            = require('gulp')
var gulpSequence    = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

var defaultTask = function(cb) {
  var tasks = getEnabledTasks('watch')
  var static = TASK_CONFIG.static ? 'static' : false
  const { prebuild, postbuild } = TASK_CONFIG.additionalTasks.development
  gulpSequence('clean', prebuild, tasks.assetTasks, tasks.codeTasks, static, postbuild, 'watch', cb)
}

gulp.task('default', defaultTask)
module.exports = defaultTask
