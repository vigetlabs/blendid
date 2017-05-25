const gulp = require('gulp')
const gutil = require('gulp-util')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const mergeStream = require('merge-stream')
const path = require('path')

gulp.task('init-drupal', function() {
  const envBasename = path.basename(process.env.PWD)

  const configStream = gulp.src(['extras/drupal/**/*', '!extras/drupal/src/', '!extras/drupal/src/**/*', '!**/README.md'])
    .pipe(rename(function (filepath) {
      filepath.basename = filepath.basename.replace('THEMENAME', envBasename);
    }))
    .pipe(replace('THEMENAME', envBasename))
    .pipe(gulp.dest(process.env.PWD))

  const srcStream = gulp.src(['extras/drupal/src/**/*', '*.gitkeep'])
    .pipe(gulp.dest(path.join(process.env.PWD, PATH_CONFIG.src)))

  gutil.log(gutil.colors.green('Created config/path-config.json'))
  gutil.log(gutil.colors.green('Created config/task-config.js'))
  gutil.log(gutil.colors.green('Created config/install/'+ envBasename +'.settings.yml'))
  gutil.log(gutil.colors.green('Created config/schema/'+ envBasename +'.schema.yml'))
  gutil.log(gutil.colors.green('Created '+ envBasename +'.info.yml'))
  gutil.log(gutil.colors.green('Created '+ envBasename +'.libraries.yml'))
  gutil.log(gutil.colors.green('Created '+ envBasename +'.theme'))
  gutil.log(
gutil.colors.green(`Blendid is configured for Drupal!

Next Steps
==========

1) Make sure to update browserSync.proxy in 'config/task-config.js'
   to match your development url.

2) Start Compiling!

   yarn run blendid
`))

  return mergeStream(configStream, srcStream)
})
