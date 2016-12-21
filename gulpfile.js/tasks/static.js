if(!TASK_CONFIG.static) return

var dest    = require('../lib/dest')
var changed = require('gulp-changed')
var gulp    = require('gulp')
var path    = require('path')

var staticTask = function() {
    var paths = {
        src: [
            path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.static.src, '**/*'),
            path.resolve(process.env.PWD, '!' + PATH_CONFIG.src, PATH_CONFIG.static.src, 'README.md')
        ],
        dest: dest(PATH_CONFIG.static.dest)
    }

    return gulp.src(paths.src)
        .pipe(gulp.dest(paths.dest))
}

gulp.task('static', staticTask)
module.exports = staticTask
