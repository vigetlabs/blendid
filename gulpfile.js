var tasks = {
	default: [
		'serve',
		'watch'
	],

	build: [
		'audio',
		'browserify',
		'compass',
		'images'
	]
};

require('./gulp')(tasks);
