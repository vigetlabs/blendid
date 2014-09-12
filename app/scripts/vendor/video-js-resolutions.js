// Resolution switching support for videojs
//
// In this plugin I'm really going out of my way to *not* override the
// core videojs namespace and to *not* change the core API.  As a
// result this plugin is not as efficient as it might be.  It
// initializes itself *for each player* as scoped variables inside the
// plugin closure and grafts itself on to *the instance on which it was
// called* rather than on the videojs player prototype.  I don't expect
// this to be a big deal for anybody.
videojs.plugin('resolutions', function(options) {
  var player = this;

  // 'reduce' utility method
  // @param {Array} array to iterate over
  // @param {Function} iterator function for collector
  // @param {Array|Object|Number|String} initial collector
  // @return collector
  vjs.reduce = function(arr, fn, init, n) {
    if (!arr || arr.length === 0) { return; }
    for (var i=0,j=arr.length; i<j; i++) {
      init = fn.call(arr, init, arr[i], i);
    }
    return init;
  };

  this.resolutions_ = {
    options_: {},

    // takes an existing stream and stops the download entirely
    // without killing the player or disposing of the tech
    stopStream: function(){
      switch(player.techName){
      case "Html5":
        break;
      case "Flash":
        player.tech.el_.vjs_stop();
        break;
      }

      // this may cause flash or the native player to emit errors but
      // they are harmless
      player.src("");
    },

    // it is necessary to remove the sources from the DOM after
    // parsing them because otherwise the native player may be
    // inclined to stream both sources
    removeSources: function(el){
     // var videoEl = player.el_.getElementsByTagName("video")[0];
      var videoEl = player.tag;

      if (player.techName !== "Html5" || !videoEl) return;

      var srcs = videoEl.getElementsByTagName("source");
      for(var i=0;i<srcs.length;i++){
        videoEl.removeChild(srcs[i]);
      }
    },

    // buckets all parsed sources by their type ("video/mp4", for example)
    // @param {Array} array of sources:
    // [
    //   {
    //     "data-res": "HD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_hd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_sd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/ogv",
    //     "src": "http://some_video_url_sd"
    //   }
    // ]
    // @return sources grouped by type:
    // {
    //   "video/mp4": [
    //       {
    //           "data-res": "HD",
    //           "type": "video/mp4",
    //           "src": "http://some_video_url_hd"
    //       },
    //       {
    //           "data-default": "true",
    //           "data-res": "SD",
    //           "type": "video/mp4",
    //           "src": "http://some_video_url_sd"
    //       }
    //   ]
    //   "video/ogv": [
    //       {
    //           "data-res": "SD",
    //           "type": "video/ogv",
    //           "src": "http://some_video_url_sd"
    //       }
    //   ]
    // }
    bucketByTypes: function(sources){
      return vjs.reduce(sources, function(init, val, i){
        (init[val.type] = init[val.type] || []).push(val);
        return init;
      }, {}, player);
    },

    // takes parsed sources and selects the most appropriate source
    // taking into account resolution, technology support, and the
    // user's previous selections.  also indexes the sources
    // @param {Array} array of sources:
    // [
    //   {
    //     "data-res": "HD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_hd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_sd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/ogv",
    //     "src": "http://some_video_url_sd"
    //   }
    // ]
    // @return {Object} single source:
    // {
    //  "data-res": "HD",
    //  "type": "video/mp4",
    //  "src": "http://some_video_url_jd",
    //  "index": 0
    // }
    selectSource: function(sources){
      this.removeSources();

      var sourcesByType = this.bucketByTypes(sources);
      var typeAndTech   = this.selectTypeAndTech(sources);

	// added by mark 09052014
	videojs.options.sources = sourcesByType; 
	

      if (!typeAndTech) return false;

      // even though we choose the best resolution for the user here, we
      // should remember the resolutions so that we can potentially
      // change resolution later
      this.options_['sourceResolutions'] = sourcesByType[typeAndTech.type];

      return this.selectResolution(this.options_['sourceResolutions']);
    },

    // takes parsed sources and returns the most appropriate
    // technology and video type
    // @param {Array} array of sources:
    // [
    //   {
    //     "data-res": "HD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_hd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_sd"
    //   },
    //   {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/ogv",
    //     "src": "http://some_video_url_sd"
    //   }
    // ]
    // @return {Object} type/tech:
    // {
    //  "type": "video/ogv",
    //  "tech": "Html5"
    // }
    selectTypeAndTech: function(sources) {
      var techName;
      var tech;

      for (var i=0,j=player.options_['techOrder'];i<j.length;i++) {
        techName = videojs.capitalize(j[i]);
        tech     = window['videojs'][techName];

        // Check if the browser supports this technology
        if (tech.isSupported()) {
          // Loop through each source object
          for (var a=0,b=sources;a<b.length;a++) {
            var source = b[a];
            // Check if source can be played with this technology
            if (tech['canPlaySource'](source)) {
              return { type: source.type, tech: techName };
            }
          }
        }
      }
    },

    // takes an array of sources of homogeneous type (ie. a complete
    // "bucket" from the output of bucketByTypes) and returns the best
    // source, taking into account the user's previous preferences
    // stored in local storage
    // @param {Array} homogeneous sources:
    // [
    //   {
    //       "data-res": "HD",
    //       "type": "video/mp4",
    //       "src": "http://some_video_url_hd"
    //   },
    //   {
    //       "data-default": "true",
    //       "data-res": "SD",
    //       "type": "video/mp4",
    //       "src": "http://some_video_url_sd"
    //   }
    // ]
    // @return {Object} singular best source:
    // {
    //     "data-default": "true",
    //     "data-res": "SD",
    //     "type": "video/mp4",
    //     "src": "http://some_video_url_sd"
    //     "index": 1
    // }
    selectResolution: function(typeSources) {
      var defaultRes = 0;
      var supportsLocalStorage = !!window.localStorage;

      // check to see if any sources are marked as default
      videojs.obj.each(typeSources, function(i, s){
        // add the index here so we can reference it later
        s.index = parseInt(i, 10);

        if (s['data-default']) defaultRes = s.index;
      }, player);

      // if the user has previously selected a preference, check if
      // that preference is available. if not, use the source marked
      // default
      var preferredRes = defaultRes;

      // trying to follow the videojs code conventions of if statements
      if (supportsLocalStorage){
        var storedRes = parseInt(window.localStorage.getItem('videojs_preferred_res'), 10);

        if (!isNaN(storedRes))
          preferredRes = storedRes;
      }

      var maxRes    = (typeSources.length - 1);
      var actualRes = preferredRes > maxRes ? maxRes : preferredRes;
		
      return typeSources[actualRes];
    }
  };

  // convenience method
  // @return {String} cached resolution label:
  // "SD"
  player.resolution = function(){
      return this.cache_.src.res;
  };

  // takes a source and switches the player's stream to it on the fly
  // @param {Object} singular source:
  // {
  //     "data-default": "true",
  //    "data-res": "SD",
  //     "type": "video/mp4",
  //     "src": "http://some_video_url_sd"
  // }
  player.changeResolution = function(new_source){
    // has the exact same source been chosen?
    if (this.cache_.src === new_source.src){
      this.trigger('resolutionchange');
      return this; // basically a no-op
    }

    // remember our position and playback state
    var curTime      = this.currentTime();
    var remainPaused = this.paused();

    // pause playback
    this.pause();

    // attempts to stop the download of the existing video
    this.resolutions_.stopStream();

    // HTML5 tends to not recover from reloading the tech but it can
    // generally handle changing src.  Flash generally cannot handle
    // changing src but can reload its tech.
    if (this.techName === "Html5"){
      this.src(new_source.src);
    } else {
      this.loadTech(this.techName, {src: new_source.src});
    }

    // when the technology is re-started, kick off the new stream
    this.ready(function() {
      this.one('loadeddata', vjs.bind(this, function() {
        this.currentTime(curTime);
      }));

      this.trigger('resolutionchange');

      if (!remainPaused) {
        this.load();
        this.play();
      }

      // remember this selection
      vjs.setLocalStorage('videojs_preferred_res', parseInt(new_source.index, 10));
    });
  };

  /* Resolution Menu Items
  ================================================================================ */
  var ResolutionMenuItem = videojs.MenuItem.extend({
    init: function(player, options){
      // Modify options for parent MenuItem class's init.
      options['label'] = options.source['data-res'];
      videojs.MenuItem.call(this, player, options);

      this.source = options.source;
      this.resolution = options.source['data-res'];

      this.player_.one('loadstart', vjs.bind(this, this.update));
      this.player_.on('resolutionchange', vjs.bind(this, this.update));
    }
  });

  ResolutionMenuItem.prototype.onClick = function(){
    videojs.MenuItem.prototype.onClick.call(this);
    this.player_.changeResolution(this.source);
  };

  ResolutionMenuItem.prototype.update = function(){
    var player = this.player_;
    if ((player.cache_['src'] === this.source.src)) {
      this.selected(true);
    } else {
      this.selected(false);
    }
  };

  /* Resolutions Button
  ================================================================================ */
  var ResolutionButton = videojs.MenuButton.extend({
    init: function(player, options) {
      videojs.MenuButton.call(this, player, options);

      if (this.items.length <= 1) {
        this.hide();
      }
    }
  });

  ResolutionButton.prototype.sourceResolutions_;

  ResolutionButton.prototype.sourceResolutions = function() {
    return this.sourceResolutions_;
  };

  ResolutionButton.prototype.onClick = function(e){
    // Only proceed if the target of the click was a DIV (just the button and its inner div, not the menu)
    // This prevents the menu from opening and closing when one of the menu items is clicked.
    if (e.target.className.match(/vjs-control-content/)) {

      // Toggle the 'touched' class
      this[this.el_.className.match(/touched/) ? "removeClass" : "addClass"]("touched");
    } else {

      // Remove the 'touched' class from all control bar buttons with menus to hide any already visible...
      var buttons = document.getElementsByClassName('vjs-menu-button');
      for(var i=0;i<buttons.length;i++){
        videojs.removeClass(buttons[i], 'touched');
      }

      this.removeClass('touched');
    }
  };

  ResolutionButton.prototype.createItems = function(){
    var resolutions = this.sourceResolutions_ = this.player_.resolutions_.options_['sourceResolutions'];
    var items = [];
    for (var i = 0; i < resolutions.length; i++) {
      items.push(new ResolutionMenuItem(this.player_, {
        'source': this.sourceResolutions_[i]
      }));
    }
    return items;
  };


  /**
   * @constructor
   */
  ResolutionsButton = ResolutionButton.extend({
    /** @constructor */
    init: function(player, options, ready){
      ResolutionButton.call(this, player, options, ready);
      this.el_.setAttribute('aria-label','Resolutions Menu');
      this.el_.setAttribute('id',"vjs-resolutions-button");
    }
  });

  ResolutionsButton.prototype.kind_ = 'resolutions';
  ResolutionsButton.prototype.buttonText = 'Resolutions';
  ResolutionsButton.prototype.className = 'vjs-resolutions-button';

// creates error when multiple players on one page!
/*
  // Add Button to controlBar
	  videojs.obj.merge(player.controlBar.options_['children'], {
		'resolutionsButton': {}
	  });
*/

  // let's get the party started!
  // we have to grab the parsed sources and select the source with our
  // resolution-aware source selector
  var source = player.resolutions_.selectSource(player.options_['sources']);

  // when the player is ready, add the resolution button to the control bar
  player.ready(function(){
    player.changeResolution(source);
    var button = new ResolutionsButton(player);
    player.controlBar.addChild(button);
  });
});
