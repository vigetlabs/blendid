var config       = require('../config.json');
if(!config.tasks.imagemin) return;

var gulp         = require('gulp'),
    imagemin     = require('gulp-imagemin');

var imageminTask = function(){
    gulp.src(config.tasks.imagemin.sourceImages)
        .pipe(imagemin())
        .pipe(gulp.dest(config.tasks.imagemin.optimizedImages))
};

gulp.task('imagemin', imageminTask);
gulp.watch(config.tasks.imagemin.sassWatch, imageminTask);