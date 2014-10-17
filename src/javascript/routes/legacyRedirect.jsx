/**
 * Module dependencies
 */

var request = require('reqwest')
  , host = require('../config/host');

/**
 *
 * @param {Object} ctx
 * @param {Function} next
 */
function redirect (ctx, next) {
  if(ctx.data || !ctx.params.type) return next();

  var legacyLocation = 'https://v1.admiralcloud.com/player/' + ctx.params.type + '/' + ctx.params.id;

  window.location.replace(legacyLocation);
}

module.exports = redirect;
