var gulp            = require('gulp')
var gulpSequence    = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')
var os              = require('os')
var path            = require('path')

var distUpdateTask = function (cb) {
  global.environment = 'distribution'

  // Build to a temporary directory, then move compiled files as a last step
  PATH_CONFIG.finalDest = PATH_CONFIG.dist
  PATH_CONFIG.dist = path.join(os.tmpdir(), 'gulp-starter')

  var tasks = getEnabledTasks()
  var rev = TASK_CONFIG.production.rev ? 'rev': false
  var staticTask = TASK_CONFIG.static ? 'static' : false

  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, rev, 'size-report', staticTask, 'replaceFiles', cb)
}

gulp.task('dist-update', distUpdateTask)
module.exports = distUpdateTask
