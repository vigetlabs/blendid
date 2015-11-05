var config    = require('../../config')
var gulp      = require('gulp')
var path      = require('path')
var rev        = require('gulp-rev')
var revNapkin  = require('gulp-rev-napkin');
var assetTasks = require('../../lib/getEnabledTasks')('production').assetTasks
var uniq       = require('lodash/array/uniq')

var destExtensionPairs = {}
assetTasks.forEach(function(taskName) {
  var taskConfig = config.tasks[taskName]
  destExtensionPairs[taskConfig.dest] = destExtensionPairs[taskConfig.dest] || []
  destExtensionPairs[taskConfig.dest] = uniq(taskConfig.extensions.concat(destExtensionPairs[taskConfig.dest]))
})

var assetPaths = []
for (var dest in destExtensionPairs) {
  var extensions = destExtensionPairs[dest]
  var glob = path.join(dest, '/**/*+('+ extensions.join('|') + ')')
  assetPaths.push(glob)
}

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore files that may reference assets. We'll rev them next.
  return gulp.src(path.join(config.root.dest, '{'+ assetPaths.join(',') +'}'))
    .pipe(rev())
    .pipe(gulp.dest(config.root.dest))
    .pipe(revNapkin({verbose: false}))
    .pipe(rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
})
