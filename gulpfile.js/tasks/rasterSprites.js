var config      = require('../config');
if(!config.tasks.rasterSprites) return;

var browserSync = require('browser-sync');
var gulp        = require('gulp');
var path        = require('path');
var imagemin    = require('gulp-imagemin');
var merge       = require('merge-stream');
var buffer      = require('vinyl-buffer');
var fs          = require('fs');
var glob        = require('glob');
var rsConfig    = config.tasks.rasterSprites;

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

var hasFunc = false;

function hasFunctions(){
  if( !hasFunc ){
    hasFunc = true;
    return true;
  }
  return false;
}

var rasterSpritesTask = function() {

  var paths = {
    src: path.join(config.root.src, rsConfig.src),
    dest: path.join(config.root.dest, rsConfig.dest),
    sassSrcOutput: path.join(config.root.src, rsConfig.sassSrcOutput )
  };

  var sheetName = rsConfig.sheetName || "main";
  var extensions = rsConfig.imageTypes;
  var retinaStr = rsConfig.retinaStr || "@2x";

  var folders = getFolders(paths.src);
  var stream;

  function addStreams( imgStream, cssStream ){
    if( !stream ){
        stream = merge(imgStream, cssStream);
      } else {
        stream.add( imgStream );
        stream.add( cssStream );
      }
  }
  
  extensions.map( function( ext ){
    var spritesmith = require('gulp.spritesmith');
    function getExtension(){
      return ext;
    }
    folders.map(function(folder) {
      var ext = getExtension();
      var folderPath = path.join(paths.src, folder, '/**/*.' + ext);
      //Only perform the following if there are files to use.
      if( !glob.sync( folderPath )[0] ){
        return;
      }

      var spritesmithProps = {
        imgName: folder + '.' + ext,
        cssName: '_' + folder + '-' + ext + '.sass',
        cssSpritesheetName: folder + '-' + ext,
        cssOpts: {
          functions: false
        },
        cssFormat: "sass",
        cssVarMap: function(sprite){
          var ext = getExtension();
          sprite.name = "sprite-" + folder + "-" + sprite.name + "-" + ext;
        },
        imgPath: path.join( '/', rsConfig.dest, folder + '.' + ext )
      };

      var retinaPattern = path.join(paths.src, folder, '*' + retinaStr + '.' + ext );
      var hasRetina = !!glob.sync( retinaPattern )[ 0 ];

      if( hasRetina ){
        console.log( "Matched: ", retinaStr, folder, ext, retinaPattern, glob.sync( retinaPattern ) );
        spritesmithProps.retinaSrcFilter = ['**/*' + retinaStr + '.' + ext];
        spritesmithProps.retinaImgName = folder + retinaStr + '.' + ext;
        spritesmithProps.retinaImgPath = paths.dest + retinaStr + '.' + ext;
      }

      var spriteData = gulp.src(folderPath)
        .pipe(spritesmith(spritesmithProps));

      var imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dest));

      var cssStream = spriteData.css
        .pipe(gulp.dest(paths.sassSrcOutput));

      addStreams( imgStream, cssStream );
    });

    var extPath = path.join(paths.src, '/*.' + ext);

    //Only perform the following if there are files to use.
    if( !glob.sync(  extPath )[0] ){
      return;
    }

    var spriteDataProps = {
      imgName: sheetName + '.' + ext,
      cssName: '_' + sheetName + '-' + ext + '.sass',
      cssSpritesheetName: sheetName + '-' + ext,
      cssOpts: {
        functions: hasFunctions()
      },
      cssFormat: 'sass',
      cssVarMap: function(sprite){
        var ext = getExtension();
        sprite.name = "sprite-" + sprite.name + "-" + ext;
      },
      imgPath: path.join( '/', rsConfig.dest, sheetName + '.' + ext )
    };

    var extRetinaPattern = path.join( paths.src, '/*' + retinaStr + '.' + ext );
    var hasRetina = !!glob.sync( extRetinaPattern )[ 0 ];

    if( hasRetina ){
      console.log( "Matched: ", retinaStr, ext, extRetinaPattern, glob.sync( extRetinaPattern ) );
      spriteDataProps.retinaSrcFilter = ['**/*' + retinaStr + '.' + ext];
      spriteDataProps.retinaImgName = sheetName + retinaStr + '.' + ext;
      spriteDataProps.retinaImgPath = paths.dest + retinaStr + '.' + ext;
    }

    var spriteData = gulp.src( extPath )
      .pipe(spritesmith(spriteDataProps));


    var imgStream = spriteData.img
      // DEV: We must buffer our stream into a Buffer for `imagemin`
      .pipe(buffer())
      .pipe(imagemin())
      .pipe(gulp.dest(paths.dest));

    var cssStream = spriteData.css
      .pipe(gulp.dest(paths.sassSrcOutput));

    addStreams( imgStream, cssStream );
  });
  return stream;
}

gulp.task('rasterSprites', rasterSpritesTask)
module.exports = rasterSpritesTask
