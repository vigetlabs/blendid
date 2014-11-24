gulp = require 'gulp'
del = require 'del'
config = require('../config').clean

gulp.task 'clean', (cb) ->
  del config, cb
