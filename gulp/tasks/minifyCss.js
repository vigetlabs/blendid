var gulp      = require('gulp')
var config    = require('../config').production
var minifyCSS = require('gulp-minify-css')
var size      = require('gulp-filesize')

var minifyCssTask = function() {
  return gulp.src(config.cssSrc)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(config.dest))
    .pipe(size())
}

gulp.task('minifyCss', ['sass'], minifyCssTask)
module.exports = minifyCssTask
