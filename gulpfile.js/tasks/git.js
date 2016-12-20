'use strict';
var gulp = require('gulp');
var git = require('gulp-git');
var fs = require('fs');
var rootPath = require('../lib/rootPath');

gulp.task('git:add', function () {
    return gulp.src([rootPath('package.json'), rootPath('composer.json'), rootPath(PATH_CONFIG.dist)])
    .pipe(git.add());
});

gulp.task('git:commit', function () {
    var pkgPath = rootPath('package.json');
    var version = JSON.parse(fs.readFileSync(pkgPath, 'utf8')).version;

    return gulp.src([pkgPath, rootPath('composer.json'), rootPath(PATH_CONFIG.dist)])
    .pipe(git.commit('updating build to:' + version))
});

gulp.task('git:tag', function(){
    var version = JSON.parse(fs.readFileSync(rootPath('package.json'), 'utf8')).version;
    git.tag(version, 'updating build to:' + version, function (err) {
        if (err) throw err;
    });
});