const gulp = require('gulp')
const log = require('fancy-log')
const colors = require('ansi-colors')
const mergeStream = require('merge-stream')
const projectPath = require('../lib/projectPath')

gulp.task('init-craft3', function() {
  const configStream = gulp.src('extras/craft/config/**/*')
    .pipe(gulp.dest(projectPath()))

  const srcStream = gulp.src(['src/**/*', '*.gitkeep', '!src/html/**/*', '!src/static/**/*'])
    .pipe(gulp.dest(projectPath(PATH_CONFIG.src)))


  log(colors.green('Added gulpRev plugin to craft/plugins/gulprev!'))
  log(colors.green('Created config/path-config.json'))
  log(colors.green('Created config/task-config.js'))
  log(
colors.green(`Blendid is configured for Craft 3!

Next Steps
==========

1) Make sure to update browserSync.proxy in 'config/task-config.js'
   to match your development url.

2) Install the craft-rev-assets plugin:
     $ composer require clubstudioltd/craft-asset-rev
   and then from the Craft root directory,
     $ ./craft install/plugin assetrev

2) Update the script and stylesheet tags in your layout with the
   blendid asset helpers:

   <link rel="stylesheet" href="{{ rev('assets/stylesheets/app.css') }}" />
   <script src="{{ rev('assets/javascripts/app.js') }}"></script>

4) Start Compiling!

   yarn run blendid
`))

  return mergeStream(configStream, srcStream)
})
