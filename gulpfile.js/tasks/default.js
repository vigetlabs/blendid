var gulp            = require('gulp')
var gulpSequence    = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')
var option = require('../lib/option')(TASK_CONFIG)

var defaultTask = function (cb) {
    var tasks = getEnabledTasks('watch')
    var sequence = []

    // clean if neccessary
    if ( !option.exists('cleanFirst') || option.get('cleanFirst') === true ) {
        sequence.push('clean')
    }

    // push enabled tasks
    if( tasks.assetTasks.length ) {
        sequence.push(tasks.assetTasks)
    }
    if( tasks.codeTasks.length ) {
        sequence.push(tasks.codeTasks)
    }

    // static file copy
    if (TASK_CONFIG.static) {
        sequence.push('static')
    }

    // watching and callback
    if ( !option.exists('watch') || option.get('watch') === true ) {
        sequence.push('watch')
    }
    sequence.push(cb)

    // run sequnce
    gulpSequence.apply(this, sequence)
}

gulp.task('default', defaultTask)
module.exports = defaultTask
