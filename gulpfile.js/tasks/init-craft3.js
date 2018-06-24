const gulp = require('gulp')
const gutil = require('gulp-util')
const mergeStream = require('merge-stream')
const path = require('path')

gulp.task('init-craft3', function() {
  const configStream = gulp.src('extras/craft/config/**/*')
    .pipe(gulp.dest(process.env.PWD))

  const srcStream = gulp.src(['src/**/*', '*.gitkeep', '!src/html{,/**}', '!src/static{,/**}'])
    .pipe(gulp.dest(path.join(process.env.PWD, PATH_CONFIG.src)))


  gutil.log(gutil.colors.green('Added gulpRev plugin to craft/plugins/gulprev!'))
  gutil.log(gutil.colors.green('Created config/path-config.json'))
  gutil.log(gutil.colors.green('Created config/task-config.js'))
  gutil.log(
  gutil.colors.green(`Blendid is configured for Craft 3!

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
