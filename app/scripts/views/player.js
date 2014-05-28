/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var PlayerView = Backbone.View.extend({

    el: '.container',

    template: JST['app/scripts/templates/player.ejs'],

    events: {},

    initialize: function () {
      app.log('debug', '%c PlayerView.initialize', 'color: #4444ff');
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      app.log('debug', '%c PlayerView.render', 'color: #ff44ff');
      this.$el.html(this.template(this.model.toJSON()));
    }
  });

  return PlayerView;
});
