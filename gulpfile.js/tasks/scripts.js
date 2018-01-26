var config          = global.PATH_CONFIG;
if(!config.tasks.js) return;

var gulp            = require('gulp'),
    jshint          = require('gulp-jshint'),
    concat          = require('gulp-concat'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    sourcemaps      = require('gulp-sourcemaps'),
    notify          = require('gulp-notify'),
    livereload      = require('gulp-livereload'),
    del             = require('del'),
    rev             = require('gulp-rev'),
    gutil           = require('gulp-util');

var jsTask = function() {
  //Remove old files
  del.sync(config.tasks.js.jsDest, {force:true});

  // Lint Task
  gulp.src(config.tasks.js.jsSourceFiles)
  .pipe(jshint())
  .pipe(jshint.reporter('default'));

  //concatenate & minify
  gulp.src(config.tasks.js.jsSourceFiles)
  .pipe(sourcemaps.init({
    largeFile: true
  }))
  .pipe(concat(config.tasks.js.concatJs))
  .pipe(rename(config.tasks.js.productionJs))
  .pipe(uglify())
  .on('error', gutil.log)
  .pipe(sourcemaps.write(config.tasks.js.sourcemapDest, {
    sourceRoot: config.tasks.js.sourcemapSourceRoot,
    sourceMappingURLPrefix: config.tasks.js.sourcemapDest
  }))
  .pipe(gulp.dest(config.tasks.js.jsDest))

  // File revving
  .pipe(rev())
  .pipe(gulp.dest(config.tasks.js.jsDest))
  .pipe(rev.manifest(config.tasks.rev.manifest.destination + "/" + config.tasks.rev.manifest.filename, {
      base: config.tasks.rev.manifest.destination,
      merge: true}))
  .pipe(gulp.dest(config.tasks.rev.manifest.destination))

  // Notification
  .pipe(notify({message: 'JS task complete'}));

  // Merges and minifies JS Library files
  gulp.src(config.tasks.js.jsLibrarySourceFiles)
  .pipe(sourcemaps.init({
    largeFile: true
  }))
  .pipe(concat(config.tasks.js.jsLibraries))
  .pipe(gulp.dest(config.tasks.js.jsDest))

  .pipe(rename(config.tasks.js.jsLibrariesMinified))
  .pipe(uglify())
  .pipe(sourcemaps.write(config.tasks.js.sourcemapDest, {
    sourceRoot: config.tasks.js.sourcemapSourceRoot,
    sourceMappingURLPrefix: config.tasks.js.sourcemapDest
  }))
  .pipe(gulp.dest(config.tasks.js.jsDest))
  .pipe(notify({message: 'JS (Libraries) task complete'}));


  // Error handling
  gulp.on('err', function(err){
      console.log(err);
  });

  livereload.listen();
};

gulp.task('js', jsTask);
gulp.watch(config.tasks.js.watchFiles, config.tasks.js.watchTasks);