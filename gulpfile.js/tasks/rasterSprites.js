var config      = require('../config')
if(!config.tasks.rasterSprites) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var path        = require('path')
var imagemin    = require('gulp-imagemin')
var merge       = require('merge-stream')
var buffer      = require('vinyl-buffer')
var fs          = require('fs')

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

var hasFunc = false;

function hasFunctions(){
  var ret = hasFunc;
  hasFunc = true;
  return ret;
}

var rasterSpritesTask = function() {

  var paths = {
    src: path.join(config.root.src, config.tasks.rasterSprites.src),
    dest: path.join(config.root.dest, config.tasks.rasterSprites.dest),
    sassSrcOutput: path.join(config.root.src, config.tasks.rasterSprites.sassSrcOutput )
  }

  var sheetName = config.tasks.rasterSprites.sheetName || "main";
  var extensions = config.tasks.rasterSprites.imageTypes;

  var folders = getFolders(paths.src);
  var stream;
  
  extensions.map( function( ext ){
    var spritesmith = require('gulp.spritesmith');
    function getExtension(){
      return ext;
    }
    folders.map(function(folder) {
      var ext = getExtension();
      var spriteData = gulp.src(path.join(paths.src, folder, '/**/*.' + ext))
        .pipe(spritesmith({
          imgName: folder + '.' + ext,
          cssName: folder + '-' + ext + '.sass',
          cssSpritesheetName: folder + '-' + ext,
          cssOpts: {
            functions: false
          },
          cssFormat: "sass",
          cssVarMap: function(sprite){
            var ext = getExtension();
            sprite.name = "sprite-" + folder + "-" + sprite.name + "-" + ext
          },
          imgPath: path.join( '/', config.tasks.rasterSprites.dest, folder + '.' + ext )
        }));

      var imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dest));

      var cssStream = spriteData.css
        .pipe(gulp.dest(paths.sassSrcOutput));

      if( !stream ){
        stream = merge(imgStream, cssStream);
      } else {
        stream.add( imgStream );
        stream.add( cssStream );
      }
    });

    var spriteData = gulp.src(path.join(paths.src, '/*.' + ext))
      .pipe(spritesmith({
        imgName: sheetName + '.' + ext,
        cssName: sheetName + '-' + ext + '.sass',
        cssSpritesheetName: sheetName + '-' + ext,
        cssOpts: {
          functions: hasFunctions()
        },
        cssFormat: 'sass',
        cssVarMap: function(sprite){
          var ext = getExtension();
          sprite.name = "sprite-" + sprite.name + "-" + ext
        },
        imgPath: path.join( '/', config.tasks.rasterSprites.dest, sheetName + '.' + ext )
      }));


    var imgStream = spriteData.img
      // DEV: We must buffer our stream into a Buffer for `imagemin`
      .pipe(buffer())
      .pipe(imagemin())
      .pipe(gulp.dest(paths.dest));

    var cssStream = spriteData.css
      .pipe(gulp.dest(paths.sassSrcOutput));

    stream.add( imgStream );
    stream.add( cssStream );
  })
  return stream;
}

gulp.task('rasterSprites', rasterSpritesTask)
module.exports = rasterSpritesTask
