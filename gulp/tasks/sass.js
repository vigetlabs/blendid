var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var handleErrors = require('../util/handleErrors');
var config=require('../config').sass;

gulp.task('sass', ['images'], function () {
  return gulp.src(config.src)
    .pipe(sass({
      compass: true,
      bundleExec: true,
      sourcemap: true,
      sourcemapPath: '../sass'
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.build));
});

gulp.task('sass:dist', ['images:dist', 'clean:dist'], function () {
  return gulp.src(config.src)
    .pipe(sass({
      compass: true,
      style: 'compressed',
      bundleExec: true,
      sourcemap: false
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dist));
});
