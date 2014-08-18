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
  'videojs',

], function (_, require, Backbone, config, jwplayer, jwplayerHTML5, videojs) {
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

      if (!data) {
        // reroute to error > though should not be possible as errors are caught at loading

      }

      // start tracking statistics
      app.statistic.init(data);


      if (data.player && (data.player.framework === 'jwplayer' || data.tech === "jw")) {
        that.loadJwPlayer(data);
      } else {
        that.loadVideoJsPlayer(data);
      }

      // activate resizing
      $(window).resize(function(){
        var width = $(window).width();
        var height = $(window).height();
        var $playerContainer = $('#playerContainer');
        $playerContainer.width(width);
        $playerContainer.find('div:first').width(width).height(height);

      });

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

      // choose the tech order based on
//      videojs.options.techOrder = ['html5', 'flash'];
      //console.log("tech",data.tech);
      if (data.tech && data.tech === "flash") videojs.options.techOrder = ['flash', 'html5'];

			// assume there is just one video in the data
			var video = data.playlist;

			var $player = $('#player');
			$player.attr('poster', video.image);

			video.forEach(function(src) {
				$player.append('<source src="' + src.file + '" type="video/' + src.type + '" data-res="' + src.label + '" />');
			});
			app.player = vjs('player');


			app.player.ready(function () {
				// umschaltung für formate
				app.player.resolutions();
			});

      app.player.on('timeupdate', function() {
        app.statistic.timeUpdate()
      });

      app.player.on('seeking', function() {
        app.statistic.seeking();
      })

      // always send play and pause event to stat server
      app.player.on('play',function() {
        app.statistic.trackEvent('play');
      });
      app.player.on('pause',function() {
        app.statistic.trackEvent('pause');
      });

      app.player.on('loadedmetadata', function() {
        app.statistic.trackEvent('meta');
      });

      // this event does not fire at the moment
      app.player.on('loadedalldata', function() {
        app.statistic.trackEvent('all')
      });

      app.player.on('ended', function() {
        app.statistic.trackEvent('ended');
      });

      app.player.on('error', function(errorText, errorID) {
        window.location.hash = 'playerTimeout/'+data.originalLink;
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
        width: width,
        responsive: true
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