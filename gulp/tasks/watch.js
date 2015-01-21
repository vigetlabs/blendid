/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp     = require('gulp');
var config   = require('../config');
var watchify = require('./browserify');
var watch    = require('gulp-watch');

gulp.task('watch', ['watchify', 'browserSync'], function(callback) {
  watch(config.sass.src, function(){
    gulp.start('sass')
  });
  watch(config.images.src, function(){
    gulp.start('images')
  });
  watch(config.markup.src, function(){
    gulp.start('markup')
  });
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
