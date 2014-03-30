var gulp = require('gulp');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');

module.exports = function() {
	var dest = './build/images';

	gulp.src('./src/images/**')
		.pipe(changed(dest))
		.pipe(imagemin())
		.pipe(gulp.dest(dest))
		.pipe(livereload());
};
