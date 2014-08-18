/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var PlayerTimeoutView = Backbone.View.extend({

    el: '.body',

    template: JST['app/scripts/templates/playerTimeout.ejs'],

    events: {
      'click .refresh' : 'refresh'
    },

    data: {},

    initialize: function () {
      var that = this;

    },

    render: function (params) {
      var that = this;

        that.data.url = params.url;
        that.$el.html(that.template(that.data));
    },

    refresh: function(event) {
      var that = this;

      $.get(that.url, function (data) {
       // data.originalLink = id;
       // if (tech) data.tech = tech; //can be set to flash
        var view = new PlayerView({ model: new PlayerModel(data) });
        view.render();
      })
      .fail(function() {
        // failed: try redirect to old version
        //var oldurl = 'https://v1.admiralcloud.com/player/'+type+'/'+id;
        window.location.replace(oldurl);
      });


    }
  });

  return PlayerTimeoutView;
});
