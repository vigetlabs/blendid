/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'ejs',
  'templates'
], function ($, _, Backbone, app, ejs, JST) {
  'use strict';

  var PlayerView = Backbone.View.extend({

    el: 'body',

    template: JST['app/scripts/templates/player.ejs'],
    templateError: JST['app/scripts/templates/playerError.ejs'],

    events: {},

    data: {
      wording: app.wording
    },

    initialize: function () {
      app.log('debug', '%c 404View.initialize', 'color: #4444ff');
      var that = this;
    },

    render: function () {
      app.log('debug', '%c PlayerView.render', 'color: #ff44ff');
      var that = this;

      that.$el.html(that.templateError({
        error: 404,
        errorDescription: app.wording('videoNotFound')
      }));
    }
  });

  return PlayerView;
});
