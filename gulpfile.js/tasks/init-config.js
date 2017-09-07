var gulp = require('gulp')
var gutil = require('gulp-util')
var path = require('path')
var merge = require('merge-stream')

gulp.task('init-config', function() {
  var configStream = gulp.src(['gulpfile.js/path-config.json', 'gulpfile.js/task-config.js'])
    .pipe(gulp.dest(path.join(process.env.PWD, 'config')))

  gutil.log(gutil.colors.green('Adding default path-config.json and task-config.js files to ./config/'))

  return configStream
})
