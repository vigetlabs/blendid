var gulp    = require('gulp')
var config  = require('../config').production
var size    = require('gulp-filesize')
var uglify  = require('gulp-uglify')

var uglifyTask = function() {
  return gulp.src(config.jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
    .pipe(size())
}

gulp.task('uglifyJs', ['browserify'], uglifyTask)
module.exports = uglifyTask
