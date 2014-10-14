/**
 * Module dependencies
 */

var React = require('react')
  , NotFound = require('../components/notFound.jsx');

/**
 *
 * @param {Object} ctx
 * @param {Function} next
 */
function notFound (ctx, next) {
  React.renderComponent(NotFound({ ctx: ctx }), document.getElementById('content'));
}

module.exports = notFound;
