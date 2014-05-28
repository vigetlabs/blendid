/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var PlayerModel = Backbone.Model.extend({
    url: '',

    initialize: function () {
      app.log('debug', '%c PlayerModel.initialize', 'color: #4444ff');
    },

    defaults: {
    },

    validate: function (attrs, options) {
    },

    parse: function (response, options) {
      return response;
    }
  });

  return PlayerModel;
});
