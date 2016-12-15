var gulp = require('gulp')
var fs   = require('fs')
var del  = require('del')
var path = require('path')

var replaceFiles = function (cb) {
  var temp = path.resolve(process.env.PWD, PATH_CONFIG.dest)
  var dest = path.resolve(process.env.PWD, PATH_CONFIG.finalDest)
  del.sync([ dest ], { force: true })
  fs.renameSync(temp, dest)
  del.sync([ temp ])
  cb()
}

gulp.task('replaceFiles', replaceFiles)

module.exports = replaceFiles
