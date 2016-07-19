var gulp   = require('gulp')
var del    = require('del')

var cleanTask = function (cb) {
  del([GULP_CONFIG.root.dest]).then(function (paths) {
    cb()
  })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
