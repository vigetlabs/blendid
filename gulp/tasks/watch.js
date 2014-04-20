var gulp       = require('gulp');

gulp.task('watch', function(){
	gulp.watch('src/javascript/**', ['browserify']);
	gulp.watch('src/sass/**', ['compass']);
	gulp.watch('src/images/**', ['images']);
});
