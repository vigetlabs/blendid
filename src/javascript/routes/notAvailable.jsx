/**
 * Module dependencies
 */

var React = require('react')
  , NotAvailable = require('../components/notAvailable.jsx');

/**
 *
 * @param {Object} ctx
 * @param {Function} next
 */
function checkAvailability (ctx, next) {
  if(!ctx.videoNotYetAvailable) return next();
  React.renderComponent(NotAvailable({ ctx: ctx }), document.getElementById('content'));
}

module.exports = checkAvailability;
