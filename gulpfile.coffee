###
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any file in that folder gets automatically
required by the loop in ./gulp/index.js (required below).

To add a new task, simply add a new task file to gulp/tasks.
###

require('./gulp')

#gulp = require 'gulp'
#gutil = require 'gulp-util'
#uglify = require 'gulp-uglify'
#coffee = require 'gulp-coffee'
#watch = require 'gulp-watch'
#concat = require 'gulp-concat'
#imagemin = require 'gulp-imagemin'
#clean = require 'gulp-clean'
#flatten = require 'gulp-flatten'
#minifycss = require 'gulp-minify-css'
#size = require 'gulp-size'
#
#
#path =
#  scripts: 'app/scripts/**/*.coffee'
#  styles: 'app/styles/**/*.css'
#  bower: 'app/components'
#  html: 'app/html/**/*.html'
#  assets: 'app/assets/*'
#
#
#gulp.task 'scripts', () ->
#  gulp.src(path.scripts)
#    .pipe(coffee({bare: true}).on 'error', gutil.log)
#    .pipe(concat 'app.min.js')
#    .pipe(size())
#    .pipe(gulp.dest '_public/js')
#
#gulp.task 'uglyscripts', () ->
#  gulp.src(path.scripts)
#    .pipe(coffee({bare: true}).on 'error', gutil.log)
#    .pipe(concat 'app.min.js')
#    .pipe(uglify())
#    .pipe(size())
#    .pipe(gulp.dest '_public/js')
#
#gulp.task 'styles', () ->
#  gulp.src(path.styles)
#    .pipe(concat 'app.min.css')
#    .pipe(minifycss())
#    .pipe(size())
#    .pipe(gulp.dest '_public/css')
#
#gulp.task 'jquery', () ->
#  gulp.src('app/components/jquery/jquery.min.js')
#    .pipe(size())
#    .pipe(gulp.dest('_public/js'))
#
#gulp.task 'bowerjs', () ->
#  gulp.src('app/components/**/*.min.js', !'app/components/jquery/jquery.min.js')
#    .pipe(flatten())
#    .pipe(concat 'vendor.min.js')
#    .pipe(size())
#    .pipe(gulp.dest('_public/js'))
#
#gulp.task 'bowercss', () ->
#  gulp.src('app/components/**/*.min.css')
#    .pipe(flatten())
#    .pipe(concat 'vendor.min.css')
#    .pipe(size())
#    .pipe(gulp.dest('_public/css'))
#
#gulp.task 'html', () ->
#  gulp.src(path.html)
#    .pipe(size())
#    .pipe(gulp.dest '_public')
#
#gulp.task 'assets', () ->
#  gulp.src(path.assets)
#    .pipe(imagemin({optimizationLevel: 5}))
#    .pipe(size())
#    .pipe(gulp.dest '_public/assets')
#
#gulp.task 'ngroute', () ->
#  gulp.src('app/components/angular-route/angular-route.min.js')
#  .pipe(flatten())
#  .pipe(concat 'ngroute.min.js')
#  .pipe(size())
#  .pipe(gulp.dest('_public/js'))
#
#gulp.task 'watch', () ->
#  gulp.watch path.scripts, ['scripts']
#  gulp.watch path.styles, ['styles']
#  gulp.watch path.bower, ['bowerjs']
#  gulp.watch path.html, ['html']
#  gulp.watch path.assets, ['assets']
#
#gulp.task 'clean', () ->
#  gulp.src('_public', { read: false })
#    .pipe(clean())
#
#
#gulp.task 'default', ['styles', 'html', 'jquery', 'bowerjs', 'bowercss', 'assets', 'ngroute']
#
#gulp.task 'dev', ['default', 'scripts', 'watch']
#
#gulp.task 'build', ['clean', 'default', 'uglyscripts']
