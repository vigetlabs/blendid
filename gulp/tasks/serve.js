var connect = require('connect');
var gulp    = require("gulp");
var http    = require('http');
var config  = require('../config');

module.exports = function(){
	var buildPath = __dirname.split('/gulp/tasks')[0];
	var app = connect()
		.use(connect.logger('dev'))
		.use(connect.static(buildPath));

	http.createServer(app).listen(config.port);
};
