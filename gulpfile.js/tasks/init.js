var gulp = require('gulp')
var gutil = require('gulp-util')
var path = require('path')
var merge = require('merge-stream')

gulp.task('init', function() {
  var configStream = gulp.src(['extras/default/**/*', '*.gitkeep'])
    .pipe(gulp.dest(process.env.PWD))

  var srcStream = gulp.src(['src/**/*', '*.gitkeep'])
    .pipe(gulp.dest(path.join(process.env.PWD, PATH_CONFIG.src)))

  gutil.log(gutil.colors.green('Initialzing default gulp-starter project'))
  gutil.log(gutil.colors.yellow(`
Add the following scripts to package.json:
`), gutil.colors.magenta(`
"scripts": {
  "start": "gulp-starter",
  "build": "gulp-starter build",
  "deploy": "gulp-starter deploy",
  "test": "gulp-starter-karma --single-run",
  "test:watch": "gulp-starter-karma"
},`))

  return merge(configStream, srcStream)
})
