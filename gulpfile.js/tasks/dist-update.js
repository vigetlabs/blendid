var gulp            = require('gulp')
var gulpSequence    = require('gulp-sequence')
var option          = require('../lib/option')(TASK_CONFIG)
var getEnabledTasks = require('../lib/getEnabledTasks')
var os              = require('os')
var path            = require('path')

var distUpdateTask = function (cb) {
  global.production = true

  // Build to a temporary directory, then move compiled files as a last step
  PATH_CONFIG.finalDest = PATH_CONFIG.dest
  PATH_CONFIG.dest = path.join(os.tmpdir(), 'gulp-starter')

  var sequence = []
  var tasks = getEnabledTasks('production')

  // clean if neccessary
  if (!option.exists('cleanFirst') || option.get('cleanFirst') === true) {
    sequence.push('clean')
  }

  // push enabled tasks
  if( tasks.assetTasks.length ) {
    sequence.push(tasks.assetTasks)
  }
  if( tasks.codeTasks.length ) {
    sequence.push(tasks.codeTasks)
  }

  // revisioning enabled?
  if (TASK_CONFIG.production && TASK_CONFIG.production.rev) {
    sequence.push('rev')
  }

  // static file copy
  if (TASK_CONFIG.static) {
    sequence.push('static')
  }

  sequence.push('replaceFiles')

  // generate size report in console?
  if (option.get('reportSizes') === true) {
    sequence.push('size-report')
  }

  sequence.push(cb)

  // run sequnce
  gulpSequence.apply(this, sequence)
}

gulp.task('dist-update', distUpdateTask)

module.exports = distUpdateTask
