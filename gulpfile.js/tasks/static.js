var config  = require('../config')
var task 	= config.tasks.static

var changed = require('gulp-changed')
var gulp    = require('gulp')
var path    = require('path')

var paths = {
  src: [
    path.join(config.root.src, task.src, '/**'),
    path.join('!' + config.root.src, task.src, '/README.md')
  ],
  dest: path.join(config.root.dest, task.dest)
}

var staticTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
}

gulp.task('static', staticTask)
module.exports = staticTask
