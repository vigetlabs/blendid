var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var livereload = require('gulp-livereload');

module.exports = function() {
	var dest = './build/images';

	return gulp.src('./src/images/**')
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
		.pipe(gulp.dest(dest))
		.pipe(livereload());
};
