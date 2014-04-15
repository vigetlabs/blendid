var gulp = require('gulp');
var open = require("gulp-open");
var config = require('../config');

module.exports = function() {

	var options = {
		url: "http://localhost:" + config.port,
		app: "google chrome"
	};

	return gulp.src("./index.html").pipe(open("", options));
};
