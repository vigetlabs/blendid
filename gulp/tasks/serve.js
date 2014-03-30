var connect = require('connect');
var http    = require('http');

module.exports = function(){
	var buildPath = __dirname.split('/gulp/tasks')[0] + '/build';
	var app = connect()
		.use(connect.logger('dev'))
		.use(connect.static(buildPath));
	var server = http.createServer(app);
	server.listen(8080);
};
