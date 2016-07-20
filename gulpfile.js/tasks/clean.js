var gulp   = require('gulp')
var del    = require('del')

var cleanTask = function (cb) {
  return del([GULP_CONFIG.root.dest], { force: true })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
