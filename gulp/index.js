var gulp = require('gulp');

module.exports = function(tasks) {
	tasks.forEach(function(name) {
		// Initialize individual tasks
		gulp.task(name, require('./tasks/' + name));
	});
	
	return gulp;
};
