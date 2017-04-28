const gulp = require('gulp')
const gutil = require('gulp-util')
const mergeStream = require('merge-stream')

gulp.task('init-craft', function() {
  const configStream = gulp.src(['extras/craft/**/*', '*!ASSET-README.md'])
    .pipe(gulp.dest(process.env.PWD))

  const srcStream = gulp.src(['src/**/*', '*.gitkeep', '!src/html', '!src/static'])
    .pipe(gulp.dest(path.join(process.env.PWD, PATH_CONFIG.src)))


  gutil.log(gutil.colors.green('Added gulpRev plugin to craft/plugins/gulprev'))
  gutil.log(
gutil.colors.magenta(`

Make sure to update browserSync.proxy in 'config/task-config.js' to match your development url.

`), gutil.colors.magenta(`
Update the script and stylesheet tags in your layout with the blendid asset helpers:

<link rel="stylesheet" href="{{ 'assets/stylesheets/app.css' | gulp_rev }}" />
<script src="{ 'assets/javascripts/app.js' | gulp_rev }"></script>
`))

  return mergeStream(configStream, srcStream)
})
