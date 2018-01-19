var gulp        = require('gulp')
var fs          = require('fs-extra')
var del         = require('del')
var projectPath = require('../lib/projectPath')

var replaceFiles = function (cb) {
  var temp = projectPath(PATH_CONFIG.dest)
  var dest = projectPath(PATH_CONFIG.finalDest)
  var delPatterns = (TASK_CONFIG.clean && TASK_CONFIG.clean.patterns) ? TASK_CONFIG.clean.patterns : dest

  del.sync(delPatterns, { force: true })
  fs.copySync(temp, dest)
  del.sync(temp, { force: true })

  cb()
}

gulp.task('replaceFiles', replaceFiles)

module.exports = replaceFiles
