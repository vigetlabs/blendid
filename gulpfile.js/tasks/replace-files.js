var gulp = require('gulp')
var fs   = require('fs-extra')
var del  = require('del')
var path = require('path')

var replaceFiles = function (cb) {
  var temp = path.resolve(process.env.PWD, PATH_CONFIG.dest)
  var dest = path.resolve(process.env.PWD, PATH_CONFIG.finalDest)
  var delPatterns = (TASK_CONFIG.clean && TASK_CONFIG.clean.patterns) ? TASK_CONFIG.clean.patterns : dest

  fs.copySync(temp, dest)
  del.sync(temp, { force: true })

  cb()
}

gulp.task('replaceFiles', replaceFiles)

module.exports = replaceFiles
