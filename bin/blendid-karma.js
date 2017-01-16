#!/usr/bin/env node
var arguments = require('minimist')(process.argv.slice(2));
require('child_process').fork(
  'node_modules/karma/bin/karma',
  ['start', 'node_modules/blendid/karma.conf'].concat(arguments._[0])
);
