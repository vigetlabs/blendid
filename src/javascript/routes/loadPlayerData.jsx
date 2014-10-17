/**
 * Module dependencies
 */

var request = require('reqwest');

/**
 *
 * @param {Object} ctx
 * @param {Function} next
 */
function loadData (ctx, next) {
  request({
    url: [ctx.params.api, '/v2/mediacontainer/de/', ctx.params.id].join('')
    , type: 'json'
    , method: 'get'
    , crossOrigin: true
    , contentType: 'text/plain'
    , error: function (err) {
      next(err);
    }
    , success: function (resp) {
      ctx.data = resp;
      next();
    }
  });
}

module.exports = loadData;
