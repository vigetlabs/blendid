const gulp = require('gulp')
const gutil = require('gulp-util')
const mergeStream = require('merge-stream')
const path = require('path')

gulp.task('init-craft', function() {
  const configStream = gulp.src(['extras/craft/**/*', '*!ASSET-README.md'])
    .pipe(gulp.dest(process.env.PWD))

  const srcStream = gulp.src(['src/**/*', '*.gitkeep', '!src/html{,/**}', '!src/static{,/**}'])
    .pipe(gulp.dest(path.join(process.env.PWD, PATH_CONFIG.src)))


  gutil.log(gutil.colors.green('Added gulpRev plugin to craft/plugins/gulprev!'))
  gutil.log(gutil.colors.green('Created config/path-config.json'))
  gutil.log(gutil.colors.green('Created config/task-config.js'))
  gutil.log(
gutil.colors.green(`Blendid is configured for Craft!

Next Steps
==========

1) Make sure to update browserSync.proxy in 'config/task-config.js'
   to match your development url.

2) Enable the Gulp Rev plugin in /admin/settings/plugins

3) Update the script and stylesheet tags in your layout with the
   blendid asset helpers:

   <link rel="stylesheet" href="{{ 'assets/stylesheets/global.css' | gulp_rev }}" />
   <script src="{{ 'assets/javascripts/app.js' | gulp_rev }}"></script>

4) When creating a new HTML component, use the blendid asset helper link on the first line:

  <link rel="stylesheet" href="{{ 'component/example-component.css' | gulp_rev }}" />

5) Start Compiling!

   yarn run blendid
`))

  return mergeStream(configStream, srcStream)
})
