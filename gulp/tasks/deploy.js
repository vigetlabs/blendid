var gulp = require('gulp');
var revall = require('gulp-rev-all');
var awspublish = require('gulp-awspublish');
var cloudfront = require("gulp-cloudfront");
var config = require('../config').deploy;

var publisher = awspublish.create(config.aws);
var headers = {'Cache-Control': 'max-age=315360000, no-transform, public'};

gulp.task('deploy', ['dist'], function () {
  gulp.src('dist/**')
    .pipe(revall({ ignore: [/^\/favicon.ico$/g] }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
    .pipe(cloudfront(config.aws));
});
