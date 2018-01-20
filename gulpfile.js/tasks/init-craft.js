const gulp = require('gulp')
const log = require('fancy-log')
const colors = require('ansi-colors')
const mergeStream = require('merge-stream')
const projectPath = require('../lib/projectPath')

gulp.task('init-craft', function() {
  const configStream = gulp.src(['extras/craft/**/*', '!**/ASSETS-README.md'])
    .pipe(gulp.dest(projectPath()))

  const srcStream = gulp.src(['src/**/*', 'src/**/.gitkeep', '!src/html{,/**}', '!src/static{,/**}'])
    .pipe(gulp.dest(projectPath(PATH_CONFIG.src)))


  log(colors.green('Added gulpRev plugin to craft/plugins/gulprev!'))
  log(colors.green('Created config/path-config.json'))
  log(colors.green('Created config/task-config.js'))
  log(
colors.green(`Blendid is configured for Craft!

Next Steps
==========

1) Make sure to update browserSync.proxy in 'config/task-config.js'
   to match your development url.

2) Enable the Gulp Rev plugin in /admin/settings/plugins

3) Update the script and stylesheet tags in your layout with the
   blendid asset helpers:

   <link rel="stylesheet" href="{{ 'assets/stylesheets/app.css' | gulp_rev }}" />
   <script src="{{ 'assets/javascripts/app.js' | gulp_rev }}"></script>

4) Start Compiling!

   yarn run blendid
`))

  return mergeStream(configStream, srcStream)
})
