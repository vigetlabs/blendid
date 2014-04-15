var gulp       = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function(){
	gulp.watch('src/javascript/**', ['browserify']);
	gulp.watch('src/sass/**', ['compass']);
	gulp.watch('src/images/**', ['images']);
	livereload();
});
