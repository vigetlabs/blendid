if(!TASK_CONFIG.html) return

const browserSync    = require('browser-sync')
const data           = require('gulp-data')
const fs             = require('fs')
const gulp           = require('gulp')
const gulpif         = require('gulp-if')
const handleErrors   = require('../lib/handleErrors')
const htmlmin        = require('gulp-htmlmin')
const nunjucksRender = require('gulp-nunjucks-render')
const projectPath    = require('../lib/projectPath')
const twig           = require('gulp-twig')
const yaml           = require('js-yaml')

const htmlTask = function() {

  const exclude = '!' + projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src, '**/{' + TASK_CONFIG.html.excludeFolders.join(',') + '}/**')

  const paths = {
    src: [projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src, '**/*.{' + TASK_CONFIG.html.extensions + '}'), exclude],
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.html.dest),
    finalDest: projectPath(PATH_CONFIG.dest,PATH_CONFIG.html.finalDest ? PATH_CONFIG.html.finalDest : PATH_CONFIG.html.dest)
  }

  const dataFunction = TASK_CONFIG.html.dataFunction || function(file) {
    const dataPath = projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src, TASK_CONFIG.html.dataFile)
    const dataExtension = dataPath.split('.').pop()
    let data

    if (dataExtension === 'yaml' || dataExtension === 'yml') {
      data = yaml.safeLoad(fs.readFileSync(dataPath, 'utf8'))
    } else {
      data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    }

    return data
  }

  const templateBasePath = [ projectPath(PATH_CONFIG.src, PATH_CONFIG.html.src) ]
  let templateParser

  if (TASK_CONFIG.html.templateLanguage === 'twig') {
    TASK_CONFIG.html.twig.base = TASK_CONFIG.html.twig.base || templateBasePath
    templateParser = twig(TASK_CONFIG.html.twig)
  } else if (TASK_CONFIG.html.templateLanguage === 'nunjucks'){
    TASK_CONFIG.html.nunjucksRender.path = TASK_CONFIG.html.nunjucksRender.path || templateBasePath
    templateParser = nunjucksRender(TASK_CONFIG.html.nunjucksRender)
  }else{
    return gulp.src(paths.src)
      .on('error', handleErrors)
      .pipe(gulpif(global.production, htmlmin(TASK_CONFIG.html.htmlmin)))
      .pipe(gulp.dest(paths.finalDest))
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.stream())
  }

  return gulp.src(paths.src)
    .pipe(data(dataFunction))
    .on('error', handleErrors)
    .pipe(templateParser)
    .on('error', handleErrors)
    .pipe(gulpif(global.production, htmlmin(TASK_CONFIG.html.htmlmin)))
    .pipe(gulp.destpaths.finalDest)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

const { alternateTask = () => htmlTask } = TASK_CONFIG.html
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG)
gulp.task('html', task)
module.exports = task
