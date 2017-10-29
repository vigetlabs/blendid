#!/usr/bin/env node

console.log('whatevs');

var shell = require("shelljs");

shell.exec("echo shell.exec works");

// const additionalArgs = require('minimist')(process.argv.slice(2))._

// let args = ['--gulpfile', 'node_modules/onward/gulpfile.js']

// if(additionalArgs.length) {
//   args = args.concat(additionalArgs)
// }

// require('child_process').fork('node_modules/gulp/bin/gulp', args)
