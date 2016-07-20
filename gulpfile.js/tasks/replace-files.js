var gulp = require('gulp')
var fs   = require('fs');
var del  = require('del')

var replaceFiles = function (cb) {
  var temp = GULP_CONFIG.root.dest
  var dest = GULP_CONFIG.root.finalDest
  del.sync([ dest ], { force: true })
  fs.renameSync(temp, dest)
  del.sync([ temp ])
  cb()
}

gulp.task('replaceFiles', replaceFiles)

module.exports = replaceFiles
