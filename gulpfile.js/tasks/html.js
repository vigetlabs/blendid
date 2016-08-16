if(!TASK_CONFIG.html) return

var browserSync  = require('browser-sync')
var data         = require('gulp-data')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin      = require('gulp-htmlmin')
var path         = require('path')
var render       = require('gulp-nunjucks-render')
var fs           = require('fs')

var htmlTask = function() {

  var exclude = '!' + path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, '**/{' + TASK_CONFIG.html.excludeFolders.join(',') + '}/**')

  var paths = {
    src: [path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, '**/*.{' + TASK_CONFIG.html.extensions + '}'), exclude],
    dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.html.dest),
  }

  var getData = function(file) {
    var dataPath = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, TASK_CONFIG.html.dataFile)
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  }

  return gulp.src(paths.src)
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(render({
      path: [path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src)],
      envOptions: {
        watch: false
      }
    }))
    .on('error', handleErrors)
    .pipe(gulpif(global.production, htmlmin(TASK_CONFIG.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())

}

gulp.task('html', htmlTask)
module.exports = htmlTask
