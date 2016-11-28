var gulp = require('gulp')
var del  = require('del')
var path = require('path')

var cleanTask = function (cb) {
  return del([path.resolve(process.env.PWD, PATH_CONFIG.dest)], { force: true })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
