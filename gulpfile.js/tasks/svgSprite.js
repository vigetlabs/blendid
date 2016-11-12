var config      = require('../config')
var task 		= config.tasks.svgSprite
if(!task) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var svgstore    = require('gulp-svgstore')
var path        = require('path')

var svgSpriteTask = function() {

  var settings = {
    src: path.join(config.root.src, task.src, '/*.svg'),
    dest: path.join(config.root.dest, task.dest)
  }

  return gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())
}

gulp.task('svgSprite', svgSpriteTask)
module.exports = svgSpriteTask
