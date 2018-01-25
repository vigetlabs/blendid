var gulp        = require('gulp')
var rev         = require('gulp-rev')
var revdel      = require('gulp-rev-delete-original')
var projectPath = require('../../lib/projectPath')

// 3) Rev and compress CSS and JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', function(){
  return gulp.src(projectPath(PATH_CONFIG.dest,'**/*.css'))
    .pipe(rev())
    .pipe(gulp.dest(PATH_CONFIG.dest))
    .pipe(revdel())
    .pipe(rev.manifest(projectPath(PATH_CONFIG.dest, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
