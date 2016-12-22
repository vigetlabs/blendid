var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')

var tagPatchTask = function(cb) {
  gulpSequence('bump:patch', 'git:add', 'git:commit','git:tag', cb)
}
var tagMinorTask = function(cb) {
  gulpSequence('bump:minor', 'git:add', 'git:commit','git:tag', cb)
}
var tagMajorTask = function(cb) {
  gulpSequence('bump:major', 'git:add', 'git:commit','git:tag', cb)
}

gulp.task('tag', tagMinorTask)
gulp.task('tag:patch', tagPatchTask)
gulp.task('tag:minor', tagMinorTask)
gulp.task('tag:major', tagMajorTask)

module.exports = tagMinorTask
