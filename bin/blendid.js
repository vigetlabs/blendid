#!/usr/bin/env node
const additionalArgs = require('minimist')(process.argv.slice(2))._

let args = ['--gulpfile', 'node_modules/blendid/gulpfile.js']

if(additionalArgs.length) {
  args = args.concat(additionalArgs)
}

require('child_process').fork('node_modules/gulp/bin/gulp', args)
