/*global define*/

define([
  'jquery',
  'backbone',
  'app',
  'views/player',
  'models/player'
], function ($, Backbone, app, PlayerView, PlayerModel) {
  'use strict';

  var PlayerRouter = Backbone.Router.extend({
    routes: {
      ':id(?env=:env)': 'player'
    },

    initialize: function () {
      app.log('debug', '%c PlayerRoutes.initialize', 'color: #4444ff');
    },

    player: function (id, env) {
      app.log('debug', '%c Player.requested', 'color: #4444ff');

      app.config.env = env || app.config.env;

      var url = app.config.host() + app.config.endpoint.player + '/';

      url += id;

      $.get(url, function (data) {
        var view = new PlayerView({ model: new PlayerModel(data) });
        view.render();
      });

//      return Backbone.history.navigate('/errorPage', { trigger: false });
    }

  });

  return PlayerRouter;
});
