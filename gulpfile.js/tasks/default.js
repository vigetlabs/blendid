const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const getEnabledTasks = require('../helpers/get-enabled-tasks');

const bsdConfig = require('../config/bsd-gulp-config.json');

// console.log(getEnabledTasks);

// let defaultTask = function (cb) {
//
//   let tasks = getEnabledTasks('watch');
//
//   let static = global.TASK_CONFIG.static ? 'static' : false;
//
//   const prebuild = global.TASK_CONFIG.additionalTasks.development.prebuild;
//   const postbuild = global.TASK_CONFIG.additionalTasks.development.postbuild;
//
//   gulpSequence('clean', prebuild, tasks.assetTasks, tasks.codeTasks, static, postbuild, 'watch', cb);
// };

// console.log(getEnabledTasks);

// gulp.task('default', defaultTask);
// module.exports = defaultTask;

gulp.task('default', bsdConfig.gulp.defaultTasks);
// module.exports = bsdConfig.gulp.defaultTasks;