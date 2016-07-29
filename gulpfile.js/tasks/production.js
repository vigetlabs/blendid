var gulp            = require('gulp')
var gulpSequence    = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')
var os              = require('os')
var path            = require('path')

var productionTask = function(cb) {
  global.production = true

  GULP_CONFIG.root.finalDest = GULP_CONFIG.root.dest
  GULP_CONFIG.root.dest = path.join(os.tmpdir(), 'gulp-starter')

  var tasks = getEnabledTasks('production')
  var rev = GULP_CONFIG.tasks.production.rev ? 'rev': false
  var static = GULP_CONFIG.tasks.static ? 'static' : false

  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, rev, 'size-report', static, 'replaceFiles', cb)
}

gulp.task('production', productionTask)
module.exports = productionTask
