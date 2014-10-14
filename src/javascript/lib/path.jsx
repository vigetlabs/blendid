/**
 * Module dependencies
 */

var qs = require('qs');
var routes = [];


function ctx (path) {
  var hash = window.location.hash.split('?')[0] || '';
  var query = window.location.hash.split('?')[1] || '';

  return {
    query: qs.parse(query)
    , hash: hash.slice(1)
    , pathname: window.location.pathname
    , params: {}
  };
}

function path (handler) {
  if (handler === undefined) return startRouting();
  return routes.push({handler: handler});
}

function startRouting () {
  var index = 0;
  var context = ctx();

  (function next () {
    // get current route and inc index afterwards
    var route = routes[index++];

    if (route) {
      var handler = route.handler;
      return handler(context, next);
    } else {
      console.log('No route matched');
    }
  })(index);
}

module.exports = path;
