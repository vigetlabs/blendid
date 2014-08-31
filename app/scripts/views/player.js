/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'ejs',
  'templates'
], function ($, _, Backbone, app, ejs, JST) {
  'use strict';

  var PlayerView = Backbone.View.extend({

    el: '.body',

    template: JST['app/scripts/templates/player.ejs'],
    templateError: JST['app/scripts/templates/playerError.ejs'],

    events: {},

    data: {
      wording: app.wording
    },

    initialize: function () {
      app.log('debug', '%c PlayerView.initialize', 'color: #4444ff');
      var that = this;

      that.listenTo(that.model, 'change', that.render);
    },

    render: function () {
      app.log('debug', '%c PlayerView.render', 'color: #ff44ff');
      var that = this;

      that.model = that.model || undefined;

      // are there any custom templates ?
      if (that.model && that.model.get('template')) {
        var template = app.helpers.prepareTemplateData(that.model.get('template'));
      }

      that.data.start = that.model && that.model.get('link') && that.model.get('link').start && new Date(that.model.get('link').start);
      that.data.end = that.model && that.model.get('link') && that.model.get('link').end && new Date(that.model.get('link').end) || undefined;

      that.linkData = that.model && that.model.get('link');

      that.metas = that && that.model && that.model.get('metadata');

      that.medias = that && that.model && that.model.get('media') || [];

      var mediacontainerId = that.model && that.model.get('link') && that.model.get('link').mediaContainerId || undefined;


      that.data.title = that.model && that.model.get('title') && _.find(that.model.get('title'),{language: app.language}) && _.find(that.model.get('title'),{language: app.language}).content || '';
      that.data.description = that.model && that.model.get('description') && _.find(that.model.get('description'),{language: app.language}) && _.find(that.model.get('description'),{language: app.language}).content || '';

      if (!that.model) {
        // general problem: no model could be fetched
        that.data.error = app.wording('error_404_h2');
        that.data.errorDescription = app.wording('error_404_p3');
        that.renderError(template);
      }
      else if (that.model.get('error')) {
        that.renderError(template);

      }
      else {

        // render the template

        if (template.ejs.player) {
          var renderedItem = ejs.render(template.ejs.player, that.data);
          that.$el.html(renderedItem);
        }
        else {
          that.$el.html(that.template(that.data));
        }

        that.loadPlayer();

        // activate watcher
        app.helpers.watchExpire(mediacontainerId, that.medias, function() {
          // render error view
          that.data.error = app.wording("timeout");
          that.data.errorDescription = app.wording("timeoutDescription");
          that.renderError(template);
        });

      }
    },


    loadPlayer: function(cb) {
      var that = this;

      var mediacontainerId = that.model && that.model.get('link') && that.model.get('link').mediaContainerId || undefined;

      var sources = [];

      that.medias.forEach(function (media) {
        if (media.url && media.fileExtension && media.type === 'video' && media.height && parseInt(media.height) > 0) {
          var height = parseInt(media.height);
          var width = parseInt(media.width) || 0;
          var ratio = width/height;

          sources.push({
            file: media.url,
            type: app.mimetype(media.fileExtension) || 'video/mp4',
            label: media.height+'p'+(height >= 720 ? ' '+app.wording('hd') : ''),
            ratio: ratio
          });
        }
      });

      var image = _.find(that.medias, { type: 'image', usage: 'preview' });

      var playerData = {
        sources: sources,
        player: 'videojs',
        tech: 'html5',
        image: image && image.url || '',
        global: that.model && that.model.get('global')
      };

      // loadPlayer and activate additional template functions
      app.loadPlayer(mediacontainerId, playerData, function() {
        // check if there a buttons in the template data-playercontrol in [play, pause, fullscreen]
        $('a[data-playercontrol="play"]').on('click', function(e){
          e.preventDefault();
          if (app.player[mediacontainerId].paused()) app.player[mediacontainerId].play();
          else app.player[mediacontainerId].pause();
        });
        $('a[data-playercontrol="fullscreen"]').on('click', function(e){
          e.preventDefault();
          if (app.player[mediacontainerId].isFullscreen()) app.player[mediacontainerId].exitFullscreen();
          else app.player[mediacontainerId].requestFullscreen();
        });

        if (cb) return cb();
      });
    },


    renderError: function(template) {
      var that = this;
      var renderedItem;
      var now = new Date();

      // time error
      if (that.model.get('error') && that.model.get('error').code === 4100) {
        if (that.data.start > now) {
          that.data.error = app.wording('videoNotYetAvailable');
          that.data.errorDescription = moment(that.data.start).format('LLL');
        }
        else {
          that.data.error = app.wording('videoNoLongerAvailable');
          that.data.errorDescription = '';
        }

        if(template.ejs.error) {
          renderedItem = ejs.render(template.ejs.error, that.data);
          renderedItem = renderedItem.replace(/\n/g,'<br />');
          that.$el.html(renderedItem);
        }
        else {
          that.$el.html(that.templateError(that.data));
        }
      }
      // match referer error
      if (that.model.get('error') && that.model.get('error').code === 4101) {
        that.data.error = app.wording('videoRefererError');
        that.data.errorDescription = '';

        if(template.ejs.error) {
          renderedItem = ejs.render(template.ejs.error, that.data);
          renderedItem = renderedItem.replace(/\n/g,'<br />');
          that.$el.html(renderedItem);
        }
        else {
          that.$el.html(that.templateError(that.data));
        }
      }
      // other error
      else {
        if (template.ejs.error) {
          renderedItem = ejs.render(template.ejs.error, that.data);
          // ejs.render renders data always as text, so if there are CR (\n) in there, we need to replace them now
          renderedItem = renderedItem.replace(/\n/g, '<br />');
          that.$el.html(renderedItem);
        }
        else {
          that.$el.html(that.templateError(that.data));
        }
      }

    },
  });

  return PlayerView;
});
