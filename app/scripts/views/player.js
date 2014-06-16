/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var PlayerView = Backbone.View.extend({

    el: '.body',

    template: JST['app/scripts/templates/player.ejs'],

    events: {},

    initialize: function () {
      app.log('debug', '%c PlayerView.initialize', 'color: #4444ff');
      var that = this;

      that.listenTo(that.model, 'change', that.render);

    },

    render: function () {
      app.log('debug', '%c PlayerView.render', 'color: #ff44ff');

      var that = this;

      var data = that.model.toJSON();

      // template laden
      that.$el.html(that.template({}));

      app.loadPlayer(data);
    }
  });

  return PlayerView;
});
