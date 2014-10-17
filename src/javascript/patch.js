/**
 * Browser Support and Polyfills
 *
 * Whats this about?
 * http://facebook.github.io/react/docs/working-with-the-browser.html#browser-support-and-polyfills
 *
 * To make it short if you only need to support bleeding edge browsers remove this file and the
 * configuration in the tail of gulp/config.js and the entry in src/htdocs/index.html
 */

require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('html5shiv/dist/html5shiv');
require('html5shiv/dist/html5shiv-printshiv');
require('html5-history-api');
