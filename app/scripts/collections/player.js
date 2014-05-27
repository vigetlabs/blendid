/*global define*/

define([
  'underscore',
  'backbone',
  'models/player'
], function (_, Backbone, PlayerModel) {
  'use strict';

  var PlayerCollection = Backbone.Collection.extend({
    model: PlayerModel
  });

  return PlayerCollection;
});
