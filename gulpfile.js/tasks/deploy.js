var ghPages = require('gulp-gh-pages')
var gulp    = require('gulp')
var os      = require('os')
var path    = require('path')

var deployTask = function() {
  var pkg = require(path.resolve(process.env.PWD, 'package.json'))

  var settings = {
    url: pkg.homepage,
    src: path.resolve(process.env.PWD, PATH_CONFIG.finalDest, '**/*'),
    ghPages: {
      cacheDir: path.join(os.tmpdir(), pkg.name)
    }
  }

  return gulp.src(settings.src)
    .pipe(ghPages(settings.ghPages))
}

gulp.task('deploy', ['production'], deployTask)
module.exports = deployTask
