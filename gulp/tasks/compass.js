var compass      = require('gulp-compass');
var gulp         = require('gulp');
var notify       = require('gulp-notify');
var handleErrors = require('../util/handleErrors');

gulp.task('compass', function() {
	return gulp.src('./src/sass/*.sass')
		.pipe(compass({
			config_file: 'compass.rb',
			css: 'build',
			sass: 'src/sass'
		}))
		.on('error', handleErrors);
});
