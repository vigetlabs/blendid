/*global define*/

// We will require app in all our written modules
// Do not cause circular dependency chains by including any module
// which already includes this module

define([
  'lodash',
  'require',
  'backbone',
  'config',
  'wording',
  'mimetypes',
  'videojs'

], function (_, require, Backbone, config, wording, mimetypes, videojs) {
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

    loadPlayer: function (element, data, cb) {
      app.log('debug', 'loadPlayer', data);
      var that = this;

      if (!data) {
        // reroute to error > though should not be possible as errors are caught at loading
        return cb(404);
      }


      // start tracking statistics if set in config AND in customer (default is false)
      if (app.config.activateStatistic && data.global.tracking) app.statistic.init(data);


      if (data.player && (data.player.framework === 'jwplayer' || data.tech === "jw")) {
        if (data.player.version === "5.10") that.loadJwPlayer5(data);
      } else {
        that.loadVideoJsPlayer(element, data, function() {
          if (cb) return cb();
        });
      }


      // activate resizing
      $(window).resize(function(){
        var width = $(window).width();
        if (data && data.sources && data.sources[0].ratio) var calculatedHeight = Math.floor(width/data.sources[0].ratio);
        var height = calculatedHeight || $(window).height();

        var $playerContainer = $('#player');
        $playerContainer.width(width);
        $playerContainer.width(width).height(height);

      });

    },

    /**
     * @param element id of the player -> just for tracking!! element in DOM remains $(#player)
     * @param {MediaContainer} mediacontainer
     * @param {string} containerId
     * @param {function} done
     */
    loadVideoJsPlayer: function (element, data, cb) {
			app.log('debug', 'loadVideoJS', data);

      // if data.template.data.height and width are set, then use them and do not respond to the window size
      var width = data.template && data.template.data && data.template.data.width && parseInt(data.template.data.width) || $(window).width();
      if (data && data.sources && data.sources[0].ratio) var calculatedHeight = Math.floor(width/data.sources[0].ratio);

			var height = data.template && data.template.data && data.template.data.height && parseInt(data.template.data.height) || calculatedHeight || $(window).height();


      $('.playerWrapper').append('<video id="player" class="video-js vjs-default-skin" controls preload="auto" height="' + height + '" width="' + width + '" data-setup="{}"></video>');
      var $player = $('#player');

      app.player = app.player || [];

      var movieSources = data.sources;
      var thumbnailUrl = data.image;

      $player.attr('poster', thumbnailUrl || '');

      if (movieSources.length > 0) {
        movieSources.forEach(function (src) {
          $player.append('<source src="' + src.file + '" type="' + src.type + '" data-res="' + src.label + '" />');
        });
      }

      if (data.subtitle && data.subtitle.length > 0) {
        $.each(data.subtitle, function(i,subtitle) {
          var url = app.config.protocol +app.config.host[app.config.env] + app.config.endpoint.subtitle + '/' + subtitle.id + '/'+data.originalLink;
          $player.append('<track kind="captions" src="'+url+'" srclang="'+subtitle.language+'" label="'+subtitle.name+'" default>');
        });
      }

      app.player[element] = vjs('player');

			app.player[element].ready(function () {
				// umschaltung für formate
				app.player[element].resolutions();
        if (data.template && data.template.data && data.template.data.playercontrols === false) app.player[element].controls(false);
      });

      if (app.config.activateStatistic) {
        app.player[element].on('timeupdate', function () {
          app.statistic.timeUpdate(element)
        });

        app.player[element].on('seeking', function () {
          app.statistic.seeking(element);
        })

        // always send play and pause event to stat server
        app.player[element].on('play', function () {
          app.statistic.trackEvent('play', element);
        });
        app.player[element].on('pause', function () {
          app.statistic.trackEvent('pause', element);
        });

        app.player[element].on('loadedmetadata', function () {
          app.statistic.trackEvent('meta', element);
        });

        // this event does not fire at the moment
        app.player[element].on('loadedalldata', function () {
          app.statistic.trackEvent('all', element)
        });

        app.player[element].on('ended', function () {
          app.statistic.trackEvent('ended', element);
        });

        app.player[element].on('error', function (errorText, errorID) {
          window.location.hash = 'playerTimeout/' + data.originalLink;
        });
      }

      if (cb) return cb();

		},

    /** ATTENTION: DO NOT USE JW PLAYER: THERE IS NO LICENSE AND IT IS NOT ENABLED IN THE PLAYER AT ALL!!
     * @param {MediaContainer} mediacontainer
     * @param {string} containerId
     * @param {function} done
     */
    loadJwPlayer5: function (data, done) {
      app.log('debug', 'loadJwPlayer', data);

      var height = $(window).height();
      var width = $(window).width();


      var jwPlayerParams = {
        flashplayer: "/jwplayer/vattenfall/vattenfallplayer.swf",
        playlist: data.playlist,
        height: height,
        width: width,
        responsive: true
      };

      app.player = jwplayer('player')
        .setup(jwPlayerParams)


    }
  }, Backbone.Events);
	

  app.wording = function (word) {
    return wording[app.language][word];
  };

  app.mimetype = function (fileExtension) {
    return mimetypes[fileExtension];
  };

  return app;
});