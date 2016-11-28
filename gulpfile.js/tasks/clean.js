var gulp   = require('gulp')
var del    = require('del')
var path   = require('path')
var config = require('../config')

var cleanTask = function (cb) {
  del([path.join(config.root.dest, '/**'), path.join('!', config.root.dest)]).then(function (paths) {
    cb()
  })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
