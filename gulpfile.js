// Intitialize Gulp with each task we plan on using. This
// runs the method defined gulp/index.js, which returns gulp.
var gulp = require('./gulp')([
	'browserify',
	'compass',
	'images',
	'open',
	'watch',
	'serve'
]);

// Create any stand alone batch tasks you'd like to use
gulp.task('build', ['browserify', 'compass', 'images']);

// Create your default task that gets run with the `gulp` command
gulp.task('default', ['build', 'watch', 'serve', 'open']);
