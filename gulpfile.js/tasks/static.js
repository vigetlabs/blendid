if(!TASK_CONFIG.static) return

var changed = require('gulp-changed')
var gulp    = require('gulp')
var path    = require('path')


var staticTask = function() {
  var srcPath = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.static.src)
  var defaultSrcOptions = { dot: true }
  var options = Object.assign(defaultSrcOptions, (TASK_CONFIG.static.srcOptions || {}))

  var paths = {
    src: [
      path.join(srcPath, '**/*'),
      path.resolve(process.env.PWD, '!' + PATH_CONFIG.src, PATH_CONFIG.static.src, 'README.md')
    ],
    dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.static.dest)
  }

  return gulp.src(paths.src, options)
    .pipe(gulp.dest(paths.dest))
}

gulp.task('static', staticTask)
module.exports = staticTask
