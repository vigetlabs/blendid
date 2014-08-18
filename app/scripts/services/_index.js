/**
 * @namespace app
 */

define(function (require) {
  'use strict';

  // dependencies
  var _ = require('lodash');

  // add all services here (style name in app: required file)
  return _.assign({
    statistic: require('services/statistic')
  });
});