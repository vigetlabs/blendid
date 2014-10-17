/**
 * Module dependencies
 */

var React = require('react')
  , noSources = require('../components/noSources');

/**
 *
 * @param {Object} ctx
 * @param {Function} next
 */
function checkAvailability (ctx, next) {
  if(!ctx.videoHasNoSources) return next();
  React.renderComponent(noSources({ ctx: ctx }), document.getElementById('content'));
}

module.exports = checkAvailability;
