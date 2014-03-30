var gulp = require('gulp');

module.exports = function(tasks) {
	var allTasks = tasks.default.concat(tasks.build);

	// Create each individual task
	allTasks.forEach(function(name) {
		gulp.task(name, require('./tasks/' + name));
	});

	// Create build task from tasks.build
	gulp.task('build', tasks.build);

	// Create default task from tasks.default
	gulp.task('default', tasks.default);
};
