if(!GULP_CONFIG.tasks.css) return

var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var browserSync  = require('browser-sync')
var sass         = require('gulp-sass')
var sourcemaps   = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')
var autoprefixer = require('gulp-autoprefixer')
var path         = require('path')
var cssnano      = require('gulp-cssnano')

var paths = {
  src: path.join(GULP_CONFIG.root.src, GULP_CONFIG.tasks.css.src, '/**/*.{' + GULP_CONFIG.tasks.css.extensions + '}'),
  dest: path.join(GULP_CONFIG.root.dest, GULP_CONFIG.tasks.css.dest)
}

var cssTask = function () {
  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass(GULP_CONFIG.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(GULP_CONFIG.tasks.css.autoprefixer))
    .pipe(gulpif(global.production, cssnano({autoprefixer: false})))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('css', cssTask)
module.exports = cssTask
