const gulp        = require('gulp')
const del         = require('del')
const projectPath = require('../lib/projectPath')

const cleanTask = function (cb) {
  var patterns = TASK_CONFIG.clean && TASK_CONFIG.clean.patterns ?
    TASK_CONFIG.clean.patterns :
    projectPath(PATH_CONFIG.dest)

  return del(patterns, { force: true })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
