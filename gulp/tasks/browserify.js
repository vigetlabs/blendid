var browserify = require('browserify');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var notify = require("gulp-notify");
var source = require('vinyl-source-stream');

module.exports = function() {
	var bundleStream = browserify({
		entries: ['./src/javascript/app.coffee'],
		extensions: ['.coffee']
	}).bundle({debug: true});

	bundleStream
		.on('error', notify.onError({
			message: "<%= error.message %>",
			title: "JavaScript Error"
		}))
		.pipe(source('app.js'))
		.pipe(gulp.dest('./build/'))
		.pipe(livereload());
};
