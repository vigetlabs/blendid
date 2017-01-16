#!/usr/bin/env node
const arguments = require('minimist')(process.argv.slice(2))

let args = ['start', 'node_modules/blendid/karma.conf']

if(arguments._.length) {
  args.concat(arguments._)
}

require('child_process').fork('node_modules/karma/bin/karma', args)
