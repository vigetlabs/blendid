/*global define*/

define([], function () {
  'use strict';

  /*
   *   Explanation: If no value is provided for the key we will use the key instead
   */


  // General Usage
  var languages = {
    en: {
    },
    de: {
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
