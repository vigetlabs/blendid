var gulp = require('gulp')
var gutil = require('gulp-util')

gulp.task('init', function() {
  var stream = gulp.src(['gulpfile.js/extras/default/**/*', '*.gitkeep'])
    .pipe(gulp.dest(process.env.PWD))

  gutil.log(gutil.colors.green('Initialzing default gulp-starter project'))
  gutil.log(gutil.colors.yellow(`
Add the following scripts to package.json:
`), gutil.colors.magenta(`
"scripts": {
  "start": "gulp-starter",
  "production": "gulp-starter production",
  "deploy": "gulp-starter deploy",
  "test": "gulp-starter-karma --single-run",
  "test:watch": "gulp-starter-karma"
},`))

  return stream
})
