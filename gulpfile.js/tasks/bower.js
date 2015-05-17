var gulp = require('gulp');
var bowerFiles = require('main-bower-files');

gulp.task('bower', function() {
	return gulp.src(bowerFiles(), { base: './bower_components' })
		.pipe(gulp.dest('./public/dependencies'))
});