var browserify = require('browserify');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var notify = require("gulp-notify");
var source = require('vinyl-source-stream');

module.exports = function() {
	browserify({
		// The single point of entry for our app
		entries: ['./src/javascript/app.coffee'],
		// addtional file extentions to make optional in your requires
		extensions: ['.coffee', '.hbs']
	})
	// Expose the version of underscore that comes with backbone so we can
	// require it in our code without includin underscore twice!
	.require('backbone/node_modules/underscore', { expose: 'underscore' })
	.bundle({debug: true}) // debug: true enables source mapping!
	// Send compile errors to notification center
	.on('error', notify.onError({
		message: "<%= error.message %>",
		title: "JavaScript Error"
	}))
	// vinyl source stream lets us use your bundle with gulp
	.pipe(source('app.js'))
	// Output files with gulp.dest
	.pipe(gulp.dest('./build/'))
	// Live reload once we're done
	.pipe(livereload());
};
