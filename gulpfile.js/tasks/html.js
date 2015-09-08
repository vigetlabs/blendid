var browserSync  = require('browser-sync');
var config       = require('../config');
var gulp         = require('gulp');
var render       = require('gulp-nunjucks-render');
var gulpif       = require('gulp-if');
var htmlmin      = require('gulp-htmlmin');
var handleErrors = require('../lib/handleErrors');


var settings = {
  watch: config.src.root + '/' + config.src.html + '/**/*.html',
  src: [config.src.root + '/' + config.src.html + '/**/*.html', '!**/{layouts,shared,macros}/**'],
  dest: config.publicDirectory,
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
