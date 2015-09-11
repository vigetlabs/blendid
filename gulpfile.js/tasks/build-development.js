var config       = require('../config')
var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

gulp.task('build:development', function(cb) {
  var tasks = getEnabledTasks('development')
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'rev', cb)
})
