var gulp        = require('gulp')
var fs          = require('fs-extra')
var del         = require('del')
var projectPath = require('../lib/projectPath')

var replaceFiles = function (cb) {
  var temp = projectPath(PATH_CONFIG.dest)
  var dest = projectPath(PATH_CONFIG.finalDest)
  var delPatterns = (TASK_CONFIG.clean && TASK_CONFIG.clean.patterns) ? TASK_CONFIG.clean.patterns : dest

  del.sync(delPatterns, { force: true })
  fs.copySync(temp, dest)
  if(TASK_CONFIG.html && TASK_CONFIG.html.alternativeReplace){
    TASK_CONFIG.html.alternativeReplace();
  }else if(TASK_CONFIG.html && PATH_CONFIG.html.finalDest){
    // if you define the html.finalDest
    // You can produce the html anywhere you want
    var finalHtmlDest = projectPath(PATH_CONFIG.finalDest,PATH_CONFIG.html.finalDest);
    var tempHtml = projectPath(PATH_CONFIG.finalDest,PATH_CONFIG.html.dest);
    fs.copySync(tempHtml,finalHtmlDest);
    del.sync(tempHtml,{ force:true});
  }
  del.sync(temp, { force: true })

  cb()
}

gulp.task('replaceFiles', replaceFiles)

module.exports = replaceFiles
