var config       = require('../config')
if(!config.tasks.html) return

var browserSync  = require('browser-sync')
var gulp         = require('gulp')
var render       = require('gulp-nunjucks-render')
var gulpif       = require('gulp-if')
var htmlmin      = require('gulp-htmlmin')
var handleErrors = require('../lib/handleErrors')
var path         = require('path')

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/**/*.html'), exclude],
  dest: path.join(config.root.dest, config.tasks.html.dest),
}

gulp.task('html', function() {
  render.nunjucks.configure([path.join(config.root.src, config.tasks.html.src)], {watch: false })

  return gulp.src(paths.src)
    .pipe(render())
    .on('error', handleErrors)
    .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.reload({
      stream: true
    }))
})
