var gulp       = require('gulp');
var config     = require('../config');
var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('watch', function() {
	gulp.watch('src/sass/**', ['compass']);
	gulp.watch('src/images/**', ['images']);
	// Note: Javascript watching is handled by watchify
	// in gulp/tasks/browserify.js, when this flag is true
	config.isWatching = true;

	browserSync.init(['build/**'], {
		server: {
			baseDir: 'build'
		}
	});
});
