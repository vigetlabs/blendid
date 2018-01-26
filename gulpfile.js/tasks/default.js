const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

const config = global.PATH_CONFIG;

gulp.task('default', config.gulp.defaultTasks);
module.exports = config.gulp.defaultTasks;
