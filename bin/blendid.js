#!/usr/bin/env node
const arguments = require('minimist')(process.argv.slice(2))

let args = ['--gulpfile', 'node_modules/blendid/gulpfile.js']

if(arguments._.length) {
  args.concat(arguments._)
}

require('child_process').fork('node_modules/gulp/bin/gulp', args)
