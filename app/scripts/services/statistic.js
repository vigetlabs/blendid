/* This function can be used in player and in microsites */

/*
Videoduration in 100 Teile aufteilen und bei jedem Teil Event an stat senden, dass der punkt überschritten wurde
jeder view (also start vom video) wird getrackt udn erhält eine UUID zurück, die dann für die weitere statistik genutzt wird
> ip
> land ermitteln
> uhrzeit von firstStarted
> ended: timestamp (wenn END EVENT) > der film wurde komplett angeschaut (mindestens 1x) nur beim ersten mal erfassen
> gesamtengagement anhand der 100 teile: 100% => die gesamte länge des filmes wurde geschaut
>> json object { key=teil, value: count) > welcher teil (1% vom film) wurde wie oft angesehen
> partLenght: nie unter 1SEkunde tracken (z.b. 30s film > nur 30 Teile)
>


  Abfolge:
    wenn der embed link aufgerufen wird, wird ein statistik-eintrag generiert
  > welche linkId aufgerufen wurde



 id
 statUUID
 linkId
 customerId
 mediaContainerId
 logdate (zeit zu dem embed angefangen hat)
 ip
 country
 region
 city
 loadedmetadata (zeit zu dem die metadaten des films vorliegen)
 loadedalldata (zeit zu der der gesamte film geladen war)
 videoStarted     zeit zu dem der film erstmalig gestartet wurde
 videoEnded     zeit zu der der film komplett durchgeschaut wurde
 countPlay     wie oft wurde play gedrückt (ist der film unterbrochen worden)
 engagement     JSON-objekt
 partLength     wie lang ist jeder key im engagement


*/

define([
  'lodash',
  'jquery',
  'app'
], function (_, $, app) {
  'use strict';

  return {

    /**
     * Function calls the stat processor with videoId, mediacontainerId, customerId, logdate
     */
    init: function(data, cb) {

      var params = {
        playerId: data.global && data.global.playerId || 0,
        mediaContainerId: data.global && data.global.mediaContainerId || 0,
        customerId: data.global && data.global.customerId || 0,
        duration: data.global && data.global.duration || 0,
        partLength: data.global && data.global.partLength || 0,
        logdate: new Date().valueOf()/1000
      }

      app.videoStat = app.videoStat || [];
      app.videoStat[data.global.mediaContainerId] = params;

      app.statistic.callStatServer(params, 'POST', function(result) {
        app.videoStat[data.global.mediaContainerId] = result;
        app.videoStat[data.global.mediaContainerId].marker = 0;
        if (cb) return cb();
      })

    },

    trackEvent: function(event, element) {
      var eventsToSend = ['play','watchTime','meta','all','ended'];
      var timeStamp = app.player[element].currentTime();

      if (event === 'play') app.videoStat[element].play = timeStamp;
      if (event === 'pause') {
        // calculate the watch time, change event to watchTime and send to server
        var watchTime = Math.ceil(timeStamp - app.videoStat[element].play);
        event = 'watchTime';
      }

      if (app.videoStat[element] && eventsToSend.indexOf(event) >= 0) {
        app.statistic.callStatServer({
          trackId: app.videoStat[element].trackId,
          event: event,
          watchTime: watchTime || 0,
          eventDate: new Date().valueOf()/1000
        }, 'POST');
      }

      // send the last marker if ended is true
      if (event === 'ended') {
        app.statistic.callStatServer({
          trackId: app.videoStat[element].trackId,
          event: 'marker',
          marker: app.videoStat[element].marker
        }, 'POST');
      }

    },


    timeUpdate: function (element) {

      var timeStamp = app.player[element].currentTime();
      // beim start ist marker = partLength
      // sobald timeStamp > marker, marker auf nächste partLength setzen und stat server call dass der marker überschritten wurde

      // player starts: set to the first marker = partlength
      if (app.videoStat[element].marker === 0) {
        app.videoStat[element].marker = app.videoStat[element].partLength || 0;
      }

      if (timeStamp >= app.videoStat[element].marker && timeStamp > 0) {
        app.statistic.callStatServer({
          trackId: app.videoStat[element].trackId,
          event: 'marker',
          marker: app.videoStat[element].marker
        }, 'POST');
        app.videoStat[element].marker = app.videoStat[element].partLength * (Math.floor(timeStamp/app.videoStat[element].partLength)+1);
      }
    },

    /**
     * Timeupdate due to seeking in the video: set the marker to the next position (e.g. partLength = 5, seek pos = 7s, set marker to 10
     */
    seeking: function(element) {
      var timeStamp = app.player[element].currentTime();
      app.videoStat[element].marker = app.videoStat[element].partLength * (Math.floor(timeStamp/app.videoStat[element].partLength)+1);
    },

    /** Send data to the stat server
     *
     */
    callStatServer: function(params, method, cb) {

      var url = app.config.statServer[app.config.env];

      $.ajax({
        url: url,
        type: method || 'GET',
        data: JSON.stringify(params),
        dataType: 'JSON',
        crossDomain: true,
        headers: {
          "Content-Type": "text/plain"
        },
        success: function (data) {

          if (cb) {
            return cb(data);
          }
        }
      });

    }

  };
});