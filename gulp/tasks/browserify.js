var browserify = require('browserify');
var gulp       = require('gulp');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var handleErrors = require('../util/handleErrors');

gulp.task('browserify', function(){
	return browserify({
			entries: ['./src/javascript/app.coffee'],
			extensions: ['.coffee', '.hbs']
		})
		.require('backbone/node_modules/underscore', { expose: 'underscore' })
		.bundle({debug: true})
		.on('error', handleErrors)
		.pipe(source('app.js'))
		.pipe(gulp.dest('./build/'))
		.pipe(livereload());
});
