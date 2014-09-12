/**
 * @namespace app
 */

define([
  'lodash',
  'jquery',
  'async',
  'app'
], function (_, $, async, app) {
  'use strict';

  return {
    locationContains: function (str) {
      return _.contains(window.location.hash, str);
    },

    /**
     * Check if the media files are expired
     * @param data
     */
    watchExpire: function(element, data, cb) {
      // all media files have a expired date
      var expireMoment = data && data.playlist && data.playlist[0] && new Date(data.playlist[0].expires);

      var watcher =   setInterval (
        function() {
         if (expireMoment < new Date() && app.player[element].paused()) {
           clearInterval(watcher);
           return cb();
         }
        }, 1000 );
    },

    /*** data: playerdata
     *
     * @param data  object templateData
     */
    prepareTemplateData: function(template) {
      var templateData = {
        ejs: {},
        files: {}
      }

      // language data ?
      if (template.data) {
        var data = JSON.parse(template.data);
        if (typeof data === 'object') {
          app.wording.customLang = data.wording
        }
      }


      // ejs should be a json object (for all (partial) templates)
      if (template.ejs) {
        var ejs = JSON.parse(template.ejs);
        if (typeof ejs === "object") {
          for (var key in ejs) {
            templateData.ejs[key] = ejs[key].html;
          }
        }
      }

      var files = template.files || undefined;
      // prepare files
      if (files) {
        $.each(files, function (key, file) {
          if (file.type === 'text/css') {
            var style = document.createElement('link');
            style.type = 'text/css';
            style.rel = "stylesheet"
            style.href = file.href;
            document.getElementsByTagName('head')[0].appendChild(style);
          }
          if (file.type === 'image') {
            // prepare for use in template
            templateData.files[file.ref] = file.href;
          }
        });
      }

      // Append individual css to head
      if (template.css) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = template.css;
        document.getElementsByTagName('head')[0].appendChild(style);
      }

      return templateData;
    },

    /** Calculates a timestamp based on seconds **/
    calculateVideoTime: function (totalSec, options) {
      if (!options) {
        options = {type: 'frames'};
      } // frames are default!
      /* type: frames, min, sec - type:frame  */
      var hours = parseInt(totalSec / 3600) % 24;
      var minutes = parseInt(totalSec / 60) % 60;
      var seconds = parseInt(totalSec % 60);

      if (options.type === 'frames') {
        var frames = Math.floor((totalSec % 60 - seconds) * (app.currentMedia && app.currentMedia.get('fps') || 1));

        return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) + ',' + (frames < 10 ? '0' + frames : frames);
      }
      else if (options.type === 'overview') {
        return (hours > 0 ? (hours < 10 ? '0' + hours : hours) + ':' : '') + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
      }
      else if (options.type === 'min') {
        return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
      } else if (options.type === 'sec') {
        return (seconds < 10 ? '0' + seconds : seconds);
      } else {
        return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
      }
    },

    displayVideoTime: function () {
      var that = this;
      if (app.player) {
        var totalSec = app.player.instance.currentTime();
        $('input.time').val(app.helpers.calculateVideoTime(totalSec));
      }
    },

    /**
     * takes a videotime (hh:mm:ss(,ff)) and returns seconds
     * also checks if the value for frames is reasonable (max value = framerate)*/
    calculateRealTime: function (timestamp, options) {
      if (!options) {
        options = {};
      }
      var splitter = timestamp.split(':').reverse();
      var frames = splitter[0].split(',');
      var seconds = parseInt(splitter[0]) + parseInt(splitter[1]) * 60 + parseInt(splitter[2]) * 3600;
      if (frames[1]) {
        // add frames as hectoseconds
        if (frames[1] >= app.currentMedia.get('fps')) {
          seconds += 1.00;
        } // set to the next second, 0 frames
        else {
          seconds += frames[1] / app.currentMedia.get('fps');
        }
      }
      return seconds;
    },

    /** Takes bitrate in bit an return it in a decent human readable style **/
    calculateBitrate: function (bitrate, options) {
      if (!options) {
        options = {};
      }
      if (isNaN(options.roundByDecimals)) {
        options.roundByDecimals = 2;
      }
      var round = Math.pow(10, options.roundByDecimals);
      if (bitrate > 1048576) {
        // show in Megabit (Mb)
        return (Math.round(bitrate / 1048576 * round) / round) + 'Mb/s';
      }
      else {
        // show Kilobit (Kb)
        return (Math.round(bitrate / 1024 * round) / round) + 'kb/s';
      }
    }
  };
});