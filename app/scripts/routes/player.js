/*global define*/

define([
  'jquery',
  'backbone',
  'views/player',
  'models/player'
], function ($, Backbone, PlayerView, PlayerModel) {
  'use strict';

  var PlayerRouter = Backbone.Router.extend({
    routes: {
      ':id(?stage=:stage)': 'player'
    },

    player: function (id, stage) {
      var url;

      if (stage) {
        url = 'http://api.' + stage + '.admiralcloud.com/v2/player/';
      } else {
        url = 'http://api.admiralcloud.com/v2/player/';
      }

      url += id;

      $.get(url, function (data) {
        var view = new PlayerView({ model: new PlayerModel(data) });
      });

//      return Backbone.history.navigate('/errorPage', { trigger: false });
    }

  });

  return PlayerRouter;
});
