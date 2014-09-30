/*global define*/

define([
  'jquery',
  'backbone',
  'app',
  'views/player',
  'views/notFound',
  'models/player'
], function ($, Backbone, app, PlayerView, NotFoundView, PlayerModel) {
  'use strict';

  var PlayerRouter = Backbone.Router.extend({
    routes: {
      ':id(?env=:env)(?tech=:tech)': 'player',
      'player/:type/:id': 'ac1',
      '*notfound': 'notfound'
    },

    initialize: function () {
      app.log('debug', '%c PlayerRoutes.initialize', 'color: #4444ff');
    },

    ac1: function (type, id) {
      // check new version for embed code id

      var url = app.config.host[app.config.env] + app.config.endpoint.player + '/';
      url += id;

      $.getJSON(url)
        .done(function (data) {
        //console.log(data);
        data.originalLink = id;
        var view = new PlayerView({ model: new PlayerModel(data) });
        view.render();
      })
          .fail(function () {
            // failed: try redirect to old version
            var oldurl = 'https://v1.admiralcloud.com/player/' + type + '/' + id;
            //console.log(oldurl);
            window.location.replace(oldurl);
          });


    },

    player: function (id, env, tech) {
      app.log('debug', '%c Player.requested', 'color: #4444ff');

      app.config.env = env || app.config.env;

      var url = app.config.host[app.config.env] + app.config.endpoint.player + '/';
      url += id;

      $.getJSON(url)
        .done(function (data) {
        data.originalLink = id;
        if (tech && tech === 'flash') data.tech = tech; //can be set to flash
        var view = new PlayerView({ model: new PlayerModel(data) });
        view.render();
      })
          .fail(function () {
            var view = new NotFoundView({});
            view.render();
          });
    },


    notfound: function () {
      console.log("Not found");
    }

  });

  return PlayerRouter;
});
