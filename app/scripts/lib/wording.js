/*global define*/

define([], function () {
  'use strict';

  /*
   *   Explanation: If no value is provided for the key we will use the key instead
   */


  // General Usage
  var languages = {
    en: {
      videoTechError:               "An error occurred while we tried to display this video. Please contact support@admiralcloud.com.",
      videoNotYetAvailable:         "This video is not yet available. Please visit this page again on ",
      videoNoLongerAvailable:       "This video is no longer available.",
      videoRefererError:            "This video cannot be displayed on this page.",


      authenticationRequired:       "Authentication required to access this page.",
      authUsername:                 "Username",
      authPassword:                 "Password",
      authLogin:                    "Login",
      authWrong:                    "Wrong authentication. Please try again.",

      videoSize:                    "Size",
      fileSize:                     "File size",

      // QualityOfVideo
      hd:                         "HD",

      timeout:                      "The page has timed out.",
      timeoutDescription:           "For security reasons this page was only valid for a certain amount of time. Please use your browser's refresh button to go back to the page.",

      // Errors
      error_401_h2:               '401 - Unauthorized',
      error_403_h2:               '403 - Forbidden',
      error_404_h2:               '404 - page not found',
      error_500_h2:               '500 - Internal server error',

      error_404_p1:               'Ups... seems the admiral will come soon or has already gone.',
      error_404_p2:               'Maybe you have to come again when you know your date of your sunrise and when the fox will know everything again...',
      error_404_p3:               'For more information please',
      error_404_contact:          'contact us here'
    },
    de: {
      videoTechError:               "Ein technischer Fehler ist aufgetreten. Bitte wenden Sie sich an support@admiralcloud.com.",
      videoNotYetAvailable:         "Dieses Video ist noch nicht verfügbar. Bitte versuchen Sie es wieder ab ",
      videoNoLongerAvailable:       "Dieses Video ist nicht länger verfügbar.",
      videoRefererError:            "Dieses Video kann auf dieser Website nicht angezeigt werden.",



      authenticationRequired:       "Authentifizierung ist erforderlich.",
      authUsername:                 "Username",
      authPassword:                 "Passwort",
      authLogin:                    "Login",
      authWrong:                    "Username oder Passwort sind nicht korrekt. Bitte versuchen Sie es erneut.",

      videoSize:                    "Größe",
      fileSize:                     "Dateigröße",

      // QualityOfVideo
      hd:                         "HD",

      timeout:                      "Die Gültigkeit der Seite ist abgelaufen.",
      timeoutDescription:           "Aus Sicherheitsgründen sind alle Seiten nur für eine begrenzte Zeit gültig. Bitte nutzen Sie die RELOAD-Funktion Ihres Browsers um diese Seite erneut zu laden.",

      // Errors
      error_401_h2:               '401 - Nicht autorisiert',
      error_403_h2:               '403 - Zugriff verboten',
      error_404_h2:               '404 - Seite nicht gefunden',
      error_500_h2:               '500 - Interner Serverfehler',

      error_404_p1:               'DE: Ups... seems the admiral will come soon or has already gone.',
      error_404_p2:               'DE: Maybe you have to come again when you know your date of your sunrise and when the fox will know everything again...',
      error_404_p3:               'DE: For more information please',
      error_404_contact:          'DE: contact us here'
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
