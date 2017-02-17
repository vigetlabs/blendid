if (!TASK_CONFIG.jade && !TASK_CONFIG.pug) {
    return
}

var pug = require('./pug')
var gulp = require('gulp')
gulp.task('jade', pug)
module.exports = pug
