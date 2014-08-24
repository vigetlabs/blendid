/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'ejs',
  'templates'
], function ($, _, Backbone, ejs, JST) {
  'use strict';

  var PlayerView = Backbone.View.extend({

    el: '.body',

    template: JST['app/scripts/templates/player.ejs'],
    templateError: JST['app/scripts/templates/playerTimeError.ejs'],

    events: {},

    initialize: function () {
      app.log('debug', '%c PlayerView.initialize', 'color: #4444ff');
      var that = this;

      that.listenTo(that.model, 'change', that.render);
    },

    render: function () {
      app.log('debug', '%c PlayerView.render', 'color: #ff44ff');
      var that = this;

      var templateData = {};
      var data = that.model.toJSON();

      var element = data.global && data.global.mediaContainerId || undefined;



      var start = new Date(data.start);
      var end = data.end && new Date(data.start) || undefined;

      templateData.title = _.find(data.title,{language: app.language}) && _.find(data.title,{language: app.language}).content || '';

      if (data.template) var template = app.helpers.prepareTemplateData(data.template);


      var now = new Date();
      if (start > now || end && end < now) {
        if (data.templateError) var templateError = app.helpers.prepareTemplateData(data.templateError);

        if (templateError && templateError.ejs) {
          if (start > now) {
            templateData.error = {
              error: app.wording('startInFuture'),
              date: start && moment(start).format('LLL') || undefined
            };
          }
          if (end && end < now) {
            templateData.error = {
              error: app.wording('endInPast')
            };
          }

          if (templateError) {
            var renderedItem = ejs.render(templateError.ejs, templateData);
            that.$el.html(renderedItem);
          }
          else that.$el.html(that.templateError({}));
        }
      }
      else if (template) {
        // load individual template
        if (template) {
          var renderedItem = ejs.render(template.ejs, templateData);
          that.$el.html(renderedItem);
        }
        else {
          // load standard template
          that.$el.html(that.template({}));
        }

        // load the player
        app.loadPlayer(element, data, function() {
          // check if there a buttons in the template data-playercontrol in [play, pause, fullscreen]
          $('a[data-playercontrol="play"]').on('click', function(e){
            e.preventDefault();
            if (app.player[element].paused()) app.player[element].play();
            else app.player[element].pause();
          });
          $('a[data-playercontrol="fullscreen"]').on('click', function(e){
            e.preventDefault();
            if (app.player[element].isFullscreen()) app.player[element].exitFullscreen();
            else app.player[element].requestFullscreen();
          });
        });

      }
      else {
        // template laden
        that.$el.html(that.template({}));
       app.loadPlayer(data);
      }


      // start the expire watch
      app.helpers.watchExpire(element, data, function() {
        if (data.templateError) var templateError = app.helpers.prepareTemplateData(data.templateError);
        templateData.error = {
          error: app.wording('expired'),
          date: undefined
        };

        if (templateError) {
          var renderedItem = ejs.render(templateError.ejs, templateData);
          that.$el.html(renderedItem);
        }
        else that.$el.html(that.templateError({}));

      });



    }
  });

  return PlayerView;
});
