var connect = require('connect');
var gulp    = require("gulp");
var http    = require('http');

module.exports = function(){
	var buildPath = __dirname.split('/gulp/tasks')[0];
	var app = connect()
		.use(connect.logger('dev'))
		.use(connect.static(buildPath));

	http.createServer(app).listen(8080);
};
