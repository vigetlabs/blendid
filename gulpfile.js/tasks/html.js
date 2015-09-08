var browserSync  = require('browser-sync');
var config       = require('../config');
var gulp         = require('gulp');
var render       = require('gulp-nunjucks-render');
var gulpif       = require('gulp-if');
var htmlmin      = require('gulp-htmlmin');
var handleErrors = require('../lib/handleErrors');
var path         = require('path')


var settings = {
  src: [config.src.root + '/' + config.src.html + '/**/*.html', '!**/{layouts,parts,macros}/**'],
  dest: path.resolve(config.dest.root, config.dest.html),
  nunjucks: [config.src.root + '/' + config.src.html + '/'],
  htmlmin: {
    collapseWhitespace: true
  }
}

gulp.task('html', function() {
  render.nunjucks.configure(settings.nunjucks, {watch: false });
  return gulp.src(settings.src)
    .pipe(render())
    .on('error', handleErrors)
    .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(settings.htmlmin)))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});
