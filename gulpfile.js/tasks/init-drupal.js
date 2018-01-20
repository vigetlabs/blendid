const gulp = require('gulp')
const log = require('fancy-log')
const colors = require('ansi-colors')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const mergeStream = require('merge-stream')
const path = require('path')
const projectPath = require('../lib/projectPath')

gulp.task('init-drupal', function() {
  const envBasename = path.basename(process.env.INIT_CWD)

  const configStream = gulp.src(['extras/drupal/**/*', '!extras/drupal/src/', '!extras/drupal/src/**/*', '!**/README.md'])
    .pipe(rename(function (filepath) {
      filepath.basename = filepath.basename.replace('THEMENAME', envBasename);
    }))
    .pipe(replace('THEMENAME', envBasename))
    .pipe(gulp.dest(projectPath()))

  const srcStream = gulp.src(['extras/drupal/src/**/*', 'extras/drupal/src/**/.gitkeep'])
    .pipe(gulp.dest(projectPath(PATH_CONFIG.src)))

  log(colors.green('Created config/path-config.json'))
  log(colors.green('Created config/task-config.js'))
  log(colors.green('Created config/install/'+ envBasename +'.settings.yml'))
  log(colors.green('Created config/schema/'+ envBasename +'.schema.yml'))
  log(colors.green('Created '+ envBasename +'.info.yml'))
  log(colors.green('Created '+ envBasename +'.libraries.yml'))
  log(colors.green('Created '+ envBasename +'.theme'))
  log(
colors.green(`Blendid is configured for Drupal!

Next Steps
==========

1) Make sure to update browserSync.proxy in 'config/task-config.js'
   to match your development url.

2) Start Compiling!

   yarn run blendid
`))

  return mergeStream(configStream, srcStream)
})
