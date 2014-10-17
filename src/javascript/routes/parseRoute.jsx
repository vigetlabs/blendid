/**
 * Module dependencies
 */


var host = require('../config/host');

/**
 *
 * @param {Object} ctx
 * @param {Function} next
 */
function parseRoute (ctx, next) {
  var api, hPart, type, id;

  api = host(ctx.query.env);

  // legacy request
  if (ctx.hash.slice(0, 6) === 'player') {
    hPart = ctx.hash.split('/');
    type = hPart[1];
    id = hPart[2];
  } else {
    id = ctx.hash;
  }

  ctx.params = {api: api, type: type, id: id};
  return next();
}

module.exports = parseRoute;
