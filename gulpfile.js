var gulp = require('./gulp')([
	'browserify',
	'compass',
	'images',
	'open',
	'watch',
	'serve'
]);

gulp.task('build', ['browserify', 'compass', 'images']);
gulp.task('default', ['build', 'watch', 'serve', 'open']);
