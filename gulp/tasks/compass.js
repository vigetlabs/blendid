var compass    = require('gulp-compass');
var gulp       = require('gulp');
var livereload = require('gulp-livereload');
var notify     = require('gulp-notify');

module.exports = function() {
	return gulp.src('./src/sass/*.sass')
		.pipe(compass({
			config_file: 'compass.rb',
			css: 'build',
			sass: 'src/sass'
		}))
		.on('error', notify.onError({
			message: "<%= error.message %>",
			title: "SASS Error"
		}))
		.pipe(livereload());
};
