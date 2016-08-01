var config       = require('../config')
if(!config.tasks.html) return

var browserSync  = require('browser-sync')
var data         = require('gulp-data')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin      = require('gulp-htmlmin')
var path         = require('path')
var render       = require('gulp-nunjucks-render')
var fs           = require('fs')

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.{' + config.tasks.html.extensions + '}'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest),
}

var getData = function(file) {
  var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile)
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

var htmlTask = function() {

  return gulp.src(paths.src)
    .pipe(data(getData))
    .on('error', handleErrors)
    .pipe(render({
      path: [path.join(config.root.src, config.tasks.html.src)],
      envOptions: {
        watch: false
      }
    }))
    .on('error', handleErrors)
    .pipe(gulpif(global.production, htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .on('end', browserSync.reload)

}

gulp.task('html', htmlTask)
module.exports = htmlTask
