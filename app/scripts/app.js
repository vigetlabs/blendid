/*global define*/

// We will require app in all our written modules
// Do not cause circular dependency chains by including any module
// which already includes this module

define([
  'lodash',
  'require',
  'backbone',
  'config'
], function (_, require, Backbone, config) {
  'use strict';

  var app = _.extend({
    config: config,

    // Helper functions from here on
    /**
     * @param level
     * @param message comma separated message
     */
    log: function (level) {
      var msgLogLevel = config.logLevels.indexOf(level);
      var appLogLevel = config.logLevels.indexOf(config.logLevel);

      Array.prototype.shift.apply(arguments);

      // Support MSIE 9.0
      var log = Function.prototype.bind.call(console.log, console);

      if (appLogLevel >= msgLogLevel) log.apply(console, arguments);
    },
    time: function (label) {
      if (config.benchmark) {
        console.time(label);
      }
    },
    timeEnd: function (label) {
      if (config.benchmark) {
        console.timeEnd(label);
      }
    },
    /**
     * @param {MediaContainer} mediacontainer
     * @param {string} containerId
     * @param {function} done
     */
    initPlayer: function (containerId, data, done) {
      var movieSources = [];
      var thumbnailUrl = '';

      var height = 220;
      var width = 392;

      var jwplayerParams = {
        playlist: [
          {
            image: thumbnailUrl,
            sources: movieSources
          }
        ],
        height: height,
        width: width
      };

      if (app.player && app.player.ready) {
        app.player.remove();
      }

      app.player = jwplayer(containerId)
        .setup(jwplayerParams)
        .onSetupError(function (fallback, message) {
          console.log(fallback, message);
        });

    }
  }, Backbone.Events);

  app.wording = function (word) {
    var language = app.me && app.me.get('uiLanguage') || app.config.defaultLanguage;
    return wording[language][word];
  };

  return app;
});