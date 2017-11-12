var config       = require('../config/bsd-gulp-config.json');
if(!config.tasks.css) return;

var gulp         = require('gulp'),
    path         = require('path'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),   
    concat       = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss    = require('gulp-minify-css'), 
    sourcemaps   = require('gulp-sourcemaps'),
    notify       = require('gulp-notify'),
    csscomb      = require('gulp-csscomb'),
    livereload   = require('gulp-livereload'),
    del          = require('del'),
    gutil        = require('gulp-util'),
    rev          = require('gulp-rev');

var cssTask = function(){
  //Remove old files
  del.sync(config.tasks.css.destinationDirectory, {force:true});


  gulp.src(config.tasks.css.sourceFile, { base: config.tasks.css.sourcemapSourceRoot })
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(plumber(function (error) {
      gutil.log(error.message);
      this.emit('end');
    }))
    .pipe(sass({
        includePaths: config.tasks.css.librariesSource
    }))
    .pipe(autoprefixer({
    browsers: config.tasks.css.browserSupport,
    cascade: false,
    flexbox: true
    }))
    .pipe(sass())
    .pipe(concat(config.tasks.css.destinationFile))
    .pipe(minifyCss(config.tasks.css.minifyCssOptions))
    .pipe(sourcemaps.write(config.tasks.css.sourcemapDest, {
      sourceRoot: config.tasks.css.sourcemapSourceRoot,
      sourceMappingURLPrefix: config.tasks.css.sourcemapDest
    }))
    .pipe(gulp.dest(config.tasks.css.destinationDirectory))

    // File revving
    .pipe(rev())
    .pipe(gulp.dest(config.tasks.css.destinationDirectory))
    .pipe(rev.manifest(config.tasks.rev.manifest.destination + "/" + config.tasks.rev.manifest.filename, {
      base: config.tasks.rev.manifest.destination,
      merge: true}))
    .pipe(gulp.dest(config.tasks.rev.manifest.destination))

    // Notification
    .pipe(notify({message: 'Styles task complete'}));

    // Error handling
    gulp.on('err', function(err){
        console.log(err);
    });

  livereload.listen();
};

gulp.task('css', cssTask);
gulp.watch(config.tasks.css.watchFiles, config.tasks.css.watchTasks);