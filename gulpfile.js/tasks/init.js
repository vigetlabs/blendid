var gulp = require('gulp')
var gutil = require('gulp-util')
var path = require('path')
var merge = require('merge-stream')

gulp.task('init', function() {
  var defaultStream = gulp.src(['extras/default/**/*'])
    .pipe(gulp.dest(process.cwd()))

  var configStream = gulp.src(['gulpfile.js/path-config.json', 'gulpfile.js/task-config.js'])
    .pipe(gulp.dest(path.join(process.cwd(), 'config')))

  var srcStream = gulp.src(['src/**/*', '*.gitkeep'])
    .pipe(gulp.dest(path.join(process.cwd(), PATH_CONFIG.src)))

  gutil.log(gutil.colors.green('Generating default Blendid project files'))
  gutil.log(gutil.colors.yellow(`
To start the dev server:
`), gutil.colors.magenta(`
yarn run blendid
,`))

  return merge(defaultStream, configStream, srcStream)
})
