if (!TASK_CONFIG.jade && !TASK_CONFIG.pug) {
    return
}

var browserSync = require('browser-sync')
var data = require('gulp-data')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin = require('gulp-htmlmin')
var path = require('path')
var pug = require('pug')
var fs = require('fs')
var _ = require('lodash')

var pugOptions = {
    pug: pug,
    pretty: true
};

var pugTask = function () {
    var pugConfig = TASK_CONFIG.pug
    var pugPaths = PATH_CONFIG.pug
    var gulpPug = require('gulp-pug')

    if (!pugConfig) {
        pugConfig = TASK_CONFIG.jade
        pugPaths = PATH_CONFIG.jade
        gulpPug = require('gulp-jade')
    }

    var exclude = '!' + path.resolve(process.env.PWD, PATH_CONFIG.src, pugPaths.src, '**/{' + pugConfig.excludeFolders.join(',') + '}/**')

    var paths = {
        src: [path.resolve(process.env.PWD, PATH_CONFIG.src, pugPaths.src, '**/*.{' + pugConfig.extensions + '}'), exclude],
        dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, pugPaths.dest),
    }

    var getData = pugConfig.getData || function(file) {
      var dataPath = path.resolve(process.env.PWD, PATH_CONFIG.src, pugPaths.src, pugConfig.dataFile)
      return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    }

    return gulp.src(paths.src)
        .pipe(data(getData))
        .on('error', handleErrors)
        .pipe(gulpPug(_.assign(pugOptions, pugConfig.options)))
        .on('error', handleErrors)
        .pipe(gulpif(global.production, htmlmin(pugConfig.htmlmin)))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream())
}

gulp.task('pug', pugTask)
module.exports = pugTask
