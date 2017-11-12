#!/usr/bin/env node

// @todo - should we rename this onward or are we safe enough calling it `on`?
const customArgs = require('yargs')
  .usage('Usage: $0 [options]')
  .command('craft', 'Setup a Craft project')
  .describe('type', 'Type of project')
  .example('$0 craft', 'Prepare a Craft project in the current directory')
  .argv._;

let args = ['--gulpfile', 'node_modules/onward/gulpfile.js'];

if (customArgs.length) {
  args = args.concat(customArgs);
}

require('child_process').fork('node_modules/gulp/bin/gulp', args);
