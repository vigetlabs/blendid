var gulp       = require('gulp');
var config     = require('../config');

gulp.task('watch', function() {
	gulp.watch('src/sass/**', ['compass']);
	gulp.watch('src/images/**', ['images']);
	// Note: Javascript watching is handled by watchify
	// in gulp/tasks/browserify.js, when this flag is true
	config.isWatching = true;
});
