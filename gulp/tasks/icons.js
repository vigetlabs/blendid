var gulp        = require('gulp');
var iconfont    = require('gulp-iconfont');
var rename      = require('gulp-rename');
var consolidate = require('gulp-consolidate');

var partialName = '_icons';
var fontName    = 'icons';
var template    = 'iconfont.sass';
var className   = 'icon';
var partialDir  = './src/sass/'
var iconsDir    = './src/icons/';
var dest        = './build/fonts/';
var fontPath    = './fonts/'; // relative to compiled css

gulp.task('icons', function() {
	return gulp.src([ iconsDir + '*.svg' ])
		.pipe(iconfont({
			fontName: fontName,
			// appendCodepoints: true, // will add "UE0006-" style prefix to .svg source files
			normalize: true
		}))
		.on('codepoints', function(codepoints, options) {
			var opts = {
				glyphs: codepoints,
				fontName: fontName,
				fontPath: fontPath,
				className: className
			};

			gulp.src([ './gulp/tasks/templates/' + template ])
				.pipe(consolidate('lodash', opts))
				.pipe(rename({ basename: partialName }))
				.pipe(gulp.dest( partialDir ));
		})
		.pipe(gulp.dest( dest ));
});