var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var changed      = require('gulp-changed');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');
var minifyCSS    = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').minifyCss;

gulp.task('minifyCss', ['sass'], function () {
  return gulp.src(config.src)
    .pipe(rename({ extname: ".min.css" }))
    .pipe(changed(config.dest))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(minifyCSS())
    .on('error', handleErrors)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
