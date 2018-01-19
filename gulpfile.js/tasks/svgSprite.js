if(!TASK_CONFIG.svgSprite) return

const browserSync = require('browser-sync')
const gulp        = require('gulp')
const svgstore    = require('gulp-svgstore')
const projectPath = require('../lib/projectPath')

const svgSpriteTask = function() {

  const settings = {
    src: projectPath(PATH_CONFIG.src, PATH_CONFIG.icons.src, '*.svg'),
    dest: projectPath(PATH_CONFIG.dest, PATH_CONFIG.icons.dest)
  }

  return gulp.src(settings.src)
    .pipe(svgstore(TASK_CONFIG.svgSprite.svgstore))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream())
}

const { alternateTask = () => svgSpriteTask } = TASK_CONFIG.svgSprite
const task = alternateTask(gulp, PATH_CONFIG, TASK_CONFIG)
gulp.task('svgSprite', task)
module.exports = task
