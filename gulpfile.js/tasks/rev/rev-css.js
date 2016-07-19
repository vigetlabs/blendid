var gulp      = require('gulp')
var path      = require('path')
var rev       = require('gulp-rev')
var revNapkin = require('gulp-rev-napkin')

// 4) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', function(){
  return gulp.src(path.join(GULP_CONFIG.root.dest,'/**/*.css'))
    .pipe(rev())
    .pipe(gulp.dest(GULP_CONFIG.root.dest))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(GULP_CONFIG.root.dest, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
