gulp    = require('gulp')
compass = require('gulp-compass')
refresh = require('gulp-livereload')
lr      = require('tiny-lr')
exec    = require('child_process').exec
sys     = require('sys')
uglify  = require('gulp-uglify')
concat  = require('gulp-concat')
server  = lr()
browserify = 'browserify --transform coffeeify --extension=".coffee" --debug src/coffee/app.coffee > build/bundle.js'

gulp.task 'compass', ->
	gulp.src('./src/sass/*.sass')
	.pipe(compass(
		css: 'src/css'
		sass: 'src/sass'
		image: 'src/images'
	))
	.pipe(gulp.dest('build'))
	.pipe refresh(server)

gulp.task 'coffeeify', ->
	console.log('running coffeeify')
	# gulp-browserfy wasn't doing source maps right, so I'm using the CLI
	exec browserify, (error, stdout, stderr) ->
		console.log(error) if error

gulp.task 'uglify', ->
	gulp.src('./build/*.js')
	.pipe(concat('bundle.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./build'))

gulp.task 'refresh', ->
	gulp.src(['build/*.js', '*.html']).pipe refresh(server)

gulp.task 'lr-server', ->
	server.listen 35729, (err) ->
		console.log err if err

gulp.task 'default', ->
	gulp.run 'lr-server', 'coffeeify', 'compass', 'uglify'
	gulp.watch 'src/coffee/**', -> gulp.run 'coffeeify'
	gulp.watch ['build/*.js', '*.html'], -> gulp.run 'refresh'
	gulp.watch 'src/sass/**', -> gulp.run 'compass'
