if(!TASK_CONFIG.stylesheets) return

var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var browserSync  = require('browser-sync')
var sass         = require('gulp-sass')
var sourcemaps   = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')
var projectPath  = require('../lib/projectPath')
var postcss      = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var cssnano      = require('cssnano')

var sassTask = function () {

  var paths = {
    src: projectPath(PATH_CONFIG.src, PATH_CONFIG.stylesheets.src, '**/*.{' + TASK_CONFIG.stylesheets.extensions + '}'),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.stylesheets.dest)
  }

  if (TASK_CONFIG.stylesheets.sass && TASK_CONFIG.stylesheets.sass.includePaths) {
    TASK_CONFIG.stylesheets.sass.includePaths = TASK_CONFIG.stylesheets.sass.includePaths.map(function(includePath) {
      return projectPath(includePath)
    })
  }

  var autoprefixerConfig = TASK_CONFIG.stylesheets.autoprefixer || {}

  var cssnanoConfig = TASK_CONFIG.stylesheets.cssnano || {}
  cssnanoConfig.autoprefixer = false // this should always be false, since we're autoprefixing separately

  var postcssOptions = TASK_CONFIG.stylesheets.postcss.options || {}
  var postcssPlugins = TASK_CONFIG.stylesheets.postcss.plugins || []

  var preprocess = !!TASK_CONFIG.stylesheets.sass

  postcssPlugins.push(autoprefixer(autoprefixerConfig))

  if (global.production) {
    postcssPlugins.push(cssnano(cssnanoConfig))
  }

  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(gulpif(preprocess, sass(TASK_CONFIG.stylesheets.sass)))
    .on('error', handleErrors)
    .pipe(postcss(postcssPlugins, postcssOptions))
    .on('error', handleErrors)
    .pipe(gulpif(!global.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

const { alternateTask = () => sassTask } = TASK_CONFIG.stylesheets
const stylesheetsTask = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG)

gulp.task('stylesheets', stylesheetsTask)
module.exports = stylesheetsTask
