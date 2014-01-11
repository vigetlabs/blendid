var gulp = require('gulp');
var compass = require('gulp-compass');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var exec = require('child_process').exec;
var sys = require('sys');
var server = lr();

gulp.task('compass', function() {
    gulp.src('./src/sass/*.sass')
        .pipe(compass({
            css: 'src/css',
            sass: 'src/sass',
            image: 'src/images'
        }))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server));
});

gulp.task('markup', function() {
	gulp.src(['*.html'])
		.pipe(refresh(server));
});

gulp.task('coffeeify', function() {
	// gulp-browserfy wasn't doing source maps right,
	// or playing nicely with coffeeify. The straight up
	// cli seems to work great though!
	exec('browserify --transform coffeeify --extension=".coffee" --debug src/coffee/main.coffee > build/bundle.js');
});

gulp.task('refresh', function() {
	gulp.src('build/*.js')
		.pipe(refresh(server));
});

gulp.task('lr-server', function() {
	server.listen(35729, function(err) {
		if(err) return console.log(err);
	});
});

gulp.task('default', function() {
	gulp.run('lr-server', 'coffeeify', 'compass');

	gulp.watch('*.html', function(event) {
		gulp.run('markup');
	});

	gulp.watch('src/coffee/**', function(event) {
		gulp.run('coffeeify');
	});

	gulp.watch('build/*.js', function(){
		gulp.run('refresh');
	});

	gulp.watch('src/sass/**', function(event) {
		gulp.run('compass');
	});
});