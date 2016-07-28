var ghPages = require('gulp-gh-pages')
var gulp    = require('gulp')
var open    = require('open')
var os      = require('os')
var path    = require('path')

var deployTask = function() {
  var package = require(path.resolve(process.env.PWD, 'package.json'))
  var settings = {
    url: package.homepage,
    src: path.resolve(process.env.PWD, GULP_CONFIG.root.dest, '**/*'),
    ghPages: {
      cacheDir: path.join(os.tmpdir(), package.name)
    }
  }

  return gulp.src(settings.src)
    .pipe(ghPages(settings.ghPages))
    .on('end', function(){
      open(settings.url)
    })
}

gulp.task('deploy', ['production'], deployTask)
module.exports = deployTask
