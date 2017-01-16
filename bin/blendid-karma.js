#!/usr/bin/env node
const additionalArgs = require('minimist')(process.argv.slice(2))._

let args = ['start', 'node_modules/blendid/karma.conf']

if(additionalArgs.length) {
  args = args.concat(additionalArgs)
}

require('child_process').fork('node_modules/karma/bin/karma', args)
