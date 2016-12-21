if(!TASK_CONFIG.html) return

var browserSync  = require('browser-sync')
var data         = require('gulp-data')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var dest         = require('../lib/dest')
var htmlmin      = require('gulp-htmlmin')
var path         = require('path')
var render       = require('gulp-nunjucks-render')
var fs           = require('fs')

var htmlTask = function() {

  var exclude = '!' + path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, '**/{' + TASK_CONFIG.html.excludeFolders.join(',') + '}/**')

  var paths = {
    src: [path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, '**/*.{' + TASK_CONFIG.html.extensions + '}'), exclude],
    dest: dest(PATH_CONFIG.html.dest),
  }

  var getData = TASK_CONFIG.html.getData || function(file) {
    var dataPath = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, TASK_CONFIG.html.dataFile)
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  }

  var manageEnv = TASK_CONFIG.html.manageEnv

  return gulp.src(paths.src)
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(render({
      path: [path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src)],
      envOptions: {
        watch: false
      },
      manageEnv: manageEnv
    }))
    .on('error', handleErrors)
    .pipe(gulpif(global.environment !== 'development' && TASK_CONFIG.html.htmlmin, htmlmin(TASK_CONFIG.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())

}

gulp.task('html', htmlTask)
module.exports = htmlTask
