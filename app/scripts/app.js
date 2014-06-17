/*global define*/

// We will require app in all our written modules
// Do not cause circular dependency chains by including any module
// which already includes this module

define([
  'lodash',
  'require',
  'backbone',
  'config',
  'jwplayer',
  'jwplayerHTML5',
  
], function (_, require, Backbone, config, jwplayer, jwplayerHTML5) {
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

    loadPlayer: function (data) {
      app.log('debug', 'loadPlayer', data);
      var that = this;

      if (data.player && data.player.library === 'jwplayer') {
        that.loadJwPlayer(data);
      } else {
        that.loadVideoJsPlayer(data);
      }
    },

    /**
     * @param {MediaContainer} mediacontainer
     * @param {string} containerId
     * @param {function} done
     */
    loadVideoJsPlayer: function (data, done) {
		app.log('debug', 'loadVideoJS', data);

		var height = $(window).height();
		var width = $(window).width();

		$('#player').replaceWith('<video id="player" class="video-js vjs-default-skin" controls preload="auto" height="' + height + '" width="' + width + '" data-setup="{}"></video>');

		// assume there is just one video in the data
		var video = data.playlist[0];

		var $player = $('#player');
		$player.attr('poster', video.image);

		video.sources.forEach(function(src) {
			$player.append('<source src="' + src.file + '" type="video/' + src.type + '" data-res="' + src.label + '" />');
		});
		app.player = vjs('player');

		app.player.ready(function () {
			// umschaltung für formate
			app.player.resolutions();
		});

    },

    /**
     * @param {MediaContainer} mediacontainer
     * @param {string} containerId
     * @param {function} done
     */
    loadJwPlayer: function (data, done) {
      app.log('debug', 'loadJwPlayer', data);

      var height = $(window).height();
      var width = $(window).width();

      var jwPlayerParams = {
        playlist: data.playlist,
        height: height,
        width: width
      };

      app.player = jwplayer('player')
        .setup(jwPlayerParams)
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