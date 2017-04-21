if(!TASK_CONFIG.svgSprite) return

const browserSync = require('browser-sync')
const gulp        = require('gulp')
const svgstore    = require('gulp-svgstore')
const path        = require('path')

const svgSpriteTask = function() {

  const settings = {
    src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.icons.src, '*.svg'),
    dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.icons.dest)
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
