var gulp = require('gulp');
var config = require('../config').dist;

gulp.task('dist', [
  'uglify:dist',
  'sass:dist',
  'images:dist',
  'markup:dist',
  'video:dist',
  'vendor:dist'
]);
