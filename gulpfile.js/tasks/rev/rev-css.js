var dest      = require('../../lib/dest')
var gulp      = require('gulp')
var path      = require('path')
var rev       = require('gulp-rev')
var revNapkin = require('gulp-rev-napkin')

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', function(){
  // only rev in production environment
  if( global.environment !== 'production' ) return;

  return gulp.src(dest('**/*.css'))
    .pipe(rev())
    .pipe(gulp.dest(dest()))
    .pipe(revNapkin({verbose: false, force: true}))
    .pipe(rev.manifest(dest('rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
