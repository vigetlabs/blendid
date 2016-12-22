var gulp = require('gulp')
var fs   = require('fs')
var del  = require('del')
var path = require('path')
var dest = require('../lib/dest')

var replaceFiles = function (cb) {
  var temp = dest()
  var destination = path.resolve(process.env.PWD, PATH_CONFIG.finalDest)
  del.sync([ destination ], { force: true })
  fs.renameSync(temp, destination)
  del.sync([ temp ])
  cb()
}

gulp.task('replaceFiles', replaceFiles)

module.exports = replaceFiles
