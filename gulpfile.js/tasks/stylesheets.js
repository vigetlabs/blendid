if(!TASK_CONFIG.stylesheets) return

var gulp         = require('gulp')
var path         = require('path')
var stylelint    = require('gulp-stylelint')
var handleErrors = require('../lib/handleErrors')
var gulpif       = require('gulp-if')
var browserSync  = require('browser-sync')
var sass         = require('gulp-sass')
var sourcemaps   = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var cssnano      = require('gulp-cssnano')
var projectPath  = require('../lib/projectPath')

var sassTask = function () {

  var paths = {
    srcDir: projectPath(PATH_CONFIG.src, PATH_CONFIG.stylesheets.src),
    src: projectPath(PATH_CONFIG.src, PATH_CONFIG.stylesheets.src, '**/*.{' + TASK_CONFIG.stylesheets.extensions + '}'),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.stylesheets.dest)
  }

  if(TASK_CONFIG.stylesheets.sass && TASK_CONFIG.stylesheets.sass.includePaths) {
    TASK_CONFIG.stylesheets.sass.includePaths = TASK_CONFIG.stylesheets.sass.includePaths.map(function(includePath) {
      return projectPath(includePath)
    })
  }

  var cssnanoConfig = TASK_CONFIG.stylesheets.cssnano || {}
  cssnanoConfig.autoprefixer = false // this should always be false, since we're autoprefixing separately

  return gulp.src(paths.src)
    // allow stylelint to check if there are any syntax errors in the code
    .pipe(stylelint(TASK_CONFIG.stylesheets.stylelint))
    .on('error', handleErrors)
    // if fixable, it will push the changes back to the original file and save
    .pipe(gulp.dest(paths.srcDir))
    // then proceed with the rest of the stylesheets tasks
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass(TASK_CONFIG.stylesheets.sass))
    .on('error', handleErrors)
    .pipe(autoprefixer(TASK_CONFIG.stylesheets.autoprefixer))
    .pipe(gulpif(global.production, cssnano(cssnanoConfig)))
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

const { alternateTask = () => sassTask } = TASK_CONFIG.stylesheets
const stylesheetsTask = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG)

gulp.task('stylesheets', stylesheetsTask)
module.exports = stylesheetsTask
