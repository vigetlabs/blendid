var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('watch', function(){
	gulp.watch('src/javascript/**', ['browserify']);
	gulp.watch('src/sass/**', ['compass']);
	gulp.watch('src/images/**', ['images']);
	gulp.watch('src/htdocs/**', ['copy']);

	browserSync.init(['build/**'], {
		server: {
			baseDir: 'build'
		}
	});
});
