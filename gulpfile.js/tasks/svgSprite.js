var config      = require('../config')
if(!config.tasks.svgSprite) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var svgstore    = require('gulp-svgstore')
var cheerio     = require('gulp-cheerio')
var path        = require('path')

var svgSpriteTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
    dest: path.join(config.root.dest, config.tasks.svgSprite.dest)
  }

  return gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(svgstore())
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())
}

gulp.task('svgSprite', svgSpriteTask)
module.exports = svgSpriteTask
