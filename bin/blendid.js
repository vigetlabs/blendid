#!/usr/bin/env node
var arguments = require('minimist')(process.argv.slice(2));
require('child_process').fork(
  'node_modules/gulp/bin/gulp',
  ['--gulpfile', __dirname+'/../gulpfile.js'].concat(arguments._[0])
);
