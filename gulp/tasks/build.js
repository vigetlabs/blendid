var gulp = require('gulp');

gulp.task('build', ['uglify', 'minifyCss', 'images', 'markup']);
