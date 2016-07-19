var changed = require('gulp-changed')
var gulp    = require('gulp')
var path    = require('path')

var paths = {
  src: [
    path.join(GULP_CONFIG.root.src, GULP_CONFIG.tasks.static.src, '/**'),
    path.join('!' + GULP_CONFIG.root.src, GULP_CONFIG.tasks.static.src, '/README.md')
  ],
  dest: path.join(GULP_CONFIG.root.dest, GULP_CONFIG.tasks.static.dest)
}

var staticTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
}

gulp.task('static', staticTask)
module.exports = staticTask
