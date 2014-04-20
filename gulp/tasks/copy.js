var gulp = require('gulp');

gulp.task('copy', function() {
	return gulp.src('src/htdocs/**')
		.pipe(gulp.dest('build'));
});
