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
    templateError: JST['app/scripts/templates/playerTimeError.ejs'],

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

      var start = new Date(data.start);

      var now = new Date();
      if (start > now ) {
        if (data.templateError && data.templateError.ejs) {
          // TODO: function to create the template from string
          //that.templateError = data.templateError.ejs;
        }
        that.$el.html(that.templateError({}));
      }
      else {
        // template laden
        that.$el.html(that.template({}));
       app.loadPlayer(data);
      }

    }
  });

  return PlayerView;
});
