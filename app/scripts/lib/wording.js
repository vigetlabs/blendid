/*global define*/

define([], function () {
  'use strict';

  /*
   *   Explanation: If no value is provided for the key we will use the key instead
   */


  // General Usage
  var languages = {
    en: {
      "startInFuture"     : "This video will be available starting on ",
      "endInPast"         : "This video is no longer available.",
      "expired"           : "the video files have been expired. Please reload this page again to watch the video."

    },
    de: {
      "startInFuture"     : "Dieses Video steht zur Verfügung ab ",
      "endInPast"         : "Dieses Video steht Ihnen nicht länger zur Verfügung.",
      "expired"           : "Die Videodaten sind nicht mehr gültig. Bitte laden Sie die Seite neu um das Video zu starten."

    }
  };

  for(key in languages.en) {
    if(!languages.de[key]) {
      alert(key + ' missing');
    }
  }

  // ensure that for all keys if key value is empty string then key value is equal to key
  // cc mean countryCode
  for(var cc in languages) {
    if(languages.hasOwnProperty(cc)) {

      for(var key in languages[cc]) {
        if(languages[cc].hasOwnProperty(key) && languages[cc][key] === '') {
          languages[cc][key] = '#'+key+'#';
        }
      }

    }
  }

  return languages;

});
