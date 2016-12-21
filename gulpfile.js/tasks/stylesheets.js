if(!TASK_CONFIG.stylesheets) return

var gulp = require('gulp')
var gulpif = require('gulp-if')
var browserSync = require('browser-sync')
var sourcemaps = require('gulp-sourcemaps')
var handleErrors = require('../lib/handleErrors')
var dest         = require('../lib/dest')
var autoprefixer = require('gulp-autoprefixer')
var path         = require('path')
var cssnano      = require('gulp-cssnano')
var rename       = require('gulp-rename')

var stylesheetsTask = function () {

  // decide which plugin should be used (sass or less)
  if( typeof TASK_CONFIG.stylesheets.type === "undefined" ){
      TASK_CONFIG.stylesheets['type'] = 'sass'
  }
  var pluginType = TASK_CONFIG.stylesheets.type
  var plugin = require('gulp-'+pluginType)
  var extensions = TASK_CONFIG.stylesheets.extensions
  var options = TASK_CONFIG.stylesheets[pluginType]

  var deployUncompressed = (global.environment === 'distribution' && TASK_CONFIG.stylesheets.deployUncompressed)

  var exclude = '';
  if( TASK_CONFIG.stylesheets.excludeFolders ) {
      exclude = "!" + path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.stylesheets.src, '**/{' + TASK_CONFIG.stylesheets.excludeFolders.join(',') + '}/**/*.' + extensions)
  }

  var paths = {
    src: [
        path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.stylesheets.src, '**/*.{' + extensions + '}'),
        exclude
    ],
    dest: dest(PATH_CONFIG.stylesheets.dest)
  }

  if(TASK_CONFIG.stylesheets.sass && TASK_CONFIG.stylesheets.sass.includePaths) {
    options.includePaths = options.includePaths.map(function(includePath) {
      return path.resolve(process.env.PWD, includePath)
    })
  }

  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(plugin(options))
    .on('error', handleErrors)
    .pipe(autoprefixer(TASK_CONFIG.stylesheets.autoprefixer))
    .pipe(gulpif(deployUncompressed, gulp.dest(paths.dest)))
    .pipe(gulpif(global.environment !== 'development', cssnano({autoprefixer: false})))
    .pipe(gulpif(global.environment === 'development', sourcemaps.write()))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('stylesheets', stylesheetsTask)
module.exports = stylesheetsTask
