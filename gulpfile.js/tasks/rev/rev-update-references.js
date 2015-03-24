var config       = require('../../config');
var gulp         = require('gulp');
var revReplace   = require('gulp-rev-replace')

// 3) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', ['rev-font-workaround'], function(){
  var manifest = gulp.src(config.publicDirectory + "/rev-manifest.json");

  return gulp.src(config.publicDirectory + '/**/**.css')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(config.publicDirectory));
});
