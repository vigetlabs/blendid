var connect = require('connect');
var gulp    = require("gulp");
var http    = require('http');
var open    = require("gulp-open");

module.exports = function(){
	var buildPath = __dirname.split('/gulp/tasks')[0];
	var app = connect()
		.use(connect.logger('dev'))
		.use(connect.static(buildPath));

	// Create server
	http.createServer(app).listen(8080);

	// Open in Chrome
	var options = {
		url: "http://localhost:8080",
		app: "google chrome"
	};

	gulp.src("./index.html").pipe(open("", options));
};
