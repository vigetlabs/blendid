/**
 * Module dependencies
 */

var React = require('react')
  , Player = require('../components/player.jsx');

/**
 *
 * @param {Object} ctx
 * @param {Function} next
 */
function show (ctx, next) {
  if (!ctx.data) return next();

  var link = ctx.data.link || {};
  var start = new Date(link.start).getTime();
  var videos = ctx.data.media.filter( media => media.type === 'video' );

  if(start > Date.now()) {
    ctx.videoNotYetAvailable = true;
    return next();
  }

  if(videos.length === 0) {
    ctx.videoHasNoSources = true;
    return next();
  }

  React.renderComponent(Player(ctx.data), document.getElementById('content'));
}

module.exports = show;
