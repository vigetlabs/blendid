if(!TASK_CONFIG.svgSprite) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var svgstore    = require('gulp-svgstore')
var path        = require('path')

var svgSpriteTask = function() {

  var settings = {
    src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.icons.src, '*.svg'),
    dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.icons.dest)
  }

  return gulp.src(settings.src)
    .pipe(svgstore())
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())
}

gulp.task('svgSprite', svgSpriteTask)
module.exports = svgSpriteTask
