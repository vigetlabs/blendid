var gulp             = require('gulp');
var imagemin         = require('gulp-imagemin');
var cheerio          = require('gulp-cheerio');
var svgstore         = require('gulp-svgstore');
var config           = require('../config').iconSheet;

gulp.task('iconSheet', function() {
  return gulp.src(config.src)
    .pipe(cheerio(config.transform.before))
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(config.dest));
});