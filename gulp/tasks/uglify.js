var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var changed      = require('gulp-changed');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').uglify;

var compress = function () {
  return gulp.src(config.src)
    .pipe(rename({ extname: ".min.js" }))
    .pipe(changed(config.dest))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
};

gulp.task('uglify', ['browserify'], compress);
gulp.task('uglify-without-browserify', compress);
