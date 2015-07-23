var gulp = require('gulp');

gulp.task('default', ['iconFont'], function() {
    gulp.start('sass', 'images', 'markup', 'watch');
});
