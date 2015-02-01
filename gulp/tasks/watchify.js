var gulp           = require('gulp')
var browserifyTask = require('./browserify')

var watchifyTask = function(callback) {
  // Start browserify task with devMode === true
  browserifyTask(callback, true)
}

gulp.task('watchify', watchifyTask)
module.exports = watchifyTask
