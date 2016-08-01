var gulp   = require('gulp')
var del    = require('del')

var cleanTask = function (cb) {
  return del([PATH_CONFIG.dest], { force: true })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
