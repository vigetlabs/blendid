var gulp   = require('gulp')
var del    = require('del')
var dest   = require('../lib/dest')

var cleanTask = function (cb) {
  return del([dest()], { force: true })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
