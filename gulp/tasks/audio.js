var changed    = require('gulp-changed');
var gulp       = require('gulp');
var livereload = require('gulp-livereload');

module.exports = function() {
	var dest = './build/audio';

	// Eventually create mp3s from here
	gulp.src('./src/audio/**')
		.pipe(changed(dest))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
};
