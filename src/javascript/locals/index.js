/**
 *
 */


// General Usage
var languages = {
  en: require('./en')
  , de: require('./de')
};

for (key in languages.en) {
  if (!languages.de[key]) {
    console.log(key + ' missing');
  }
}

// ensure that for all keys if key value is empty string then key value is equal to key
// cc mean countryCode
for (var cc in languages) {
  if (languages.hasOwnProperty(cc)) {

    for (var key in languages[cc]) {
      if (languages[cc].hasOwnProperty(key) && languages[cc][key] === '') {
        languages[cc][key] = '#' + key + '#';
      }
    }

  }
}

// for cases like en-US use split
var navigatorLanguage = window.navigator.userLanguage || window.navigator.language;
navigatorLanguage = navigatorLanguage.split('-')[0];

module.exports = function (word) {
  return languages[navigatorLanguage][word];
};
