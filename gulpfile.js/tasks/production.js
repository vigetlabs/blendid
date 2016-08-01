var gulp            = require('gulp')
var gulpSequence    = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')
var os              = require('os')
var path            = require('path')

var productionTask = function(cb) {
  global.production = true

  // Build to a temporary directory, then move compiled files as a last step
  PATH_CONFIG.finalDest = PATH_CONFIG.dest
  PATH_CONFIG.dest = path.join(os.tmpdir(), 'gulp-starter')

  var tasks = getEnabledTasks('production')
  var rev = TASK_CONFIG.production.rev ? 'rev': false
  var static = TASK_CONFIG.static ? 'static' : false

  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, rev, 'size-report', static, 'replaceFiles', cb)
}

gulp.task('production', productionTask)
module.exports = productionTask
