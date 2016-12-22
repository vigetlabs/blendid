'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');
var fs = require('fs');
var semver = require('semver');
var rootPath = require('../lib/rootPath');

var bumbTask = function (type) {
    var pkgPath = rootPath('package.json');
    var pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    var newVer = semver.inc(pkg.version, type);
    console.log("bumping package.json and composer json to version:"+newVer);
    return gulp.src([pkgPath, rootPath('composer.json')])
        .pipe(bump({
            version: newVer,
            type: type
        }))
        .pipe(gulp.dest(rootPath()));
}

// bump patch, minor or major versions on package/composer.json
gulp.task('bump:patch', function(){
    return bumbTask('patch')
});
gulp.task('bump:minor', function(){
    return bumbTask('minor')
});
gulp.task('bump:major', function(){
    return bumbTask('major')
});
