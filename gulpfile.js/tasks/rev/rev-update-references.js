var config       = require('../../config');
var gulp         = require('gulp');
var revReplace   = require('gulp-rev-replace')

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function(){
  var manifest = gulp.src(config.dest.root + "/rev-manifest.json");

  return gulp.src(config.dest.root + '/**/**.{css,js}')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(config.dest.root));
});
