var gulp = require('gulp')
var log = require('fancy-log')
var colors = require('ansi-colors')
var projectPath = require('../lib/projectPath')
var merge = require('merge-stream')

gulp.task('init', function() {
  var defaultStream = gulp.src(['extras/default/**/*', 'extras/default/**/.*'])
    .pipe(gulp.dest(projectPath()))

  var configStream = gulp.src(['gulpfile.js/path-config.json', 'gulpfile.js/task-config.js'])
    .pipe(gulp.dest(projectPath('config')))

  var srcStream = gulp.src(['src/**/*', 'src/**/.gitkeep'])
    .pipe(gulp.dest(projectPath(PATH_CONFIG.src)))

  log(colors.green('Generating default Blendid project files'))
  log(colors.yellow(`
To start the dev server:
`), colors.magenta(`
yarn run blendid
`))

  return merge(defaultStream, configStream, srcStream)
})
