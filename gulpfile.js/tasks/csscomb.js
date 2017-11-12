var config       = require('../config/bsd-gulp-config.json');
if(!config.tasks.csscomb) return;

var gulp         = require('gulp');
var csscomb      = require('gulp-csscomb');

var combTask = function(){
    gulp.task('csscomb', function() {
        return gulp.src(config.tasks.csscomb.combSource)
            .pipe(csscomb(config.tasks.csscomb.combConfigFile))
            .pipe(gulp.dest(config.tasks.csscomb.combDestination));
    });
};

gulp.task('csscomb', combTask);