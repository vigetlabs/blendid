var React = require('react')
  , videojs = require('video.js')
//, videojsFlash = require('video.js/video-js/video-js.swf')
  , wording = require('../locals')
  , mimetype = require('../lib/mimetype');

videojs.options = {
  flash: {
    swf: "video-js.swf"
  }
  , techOrder: ["html5", "flash"]
};

/**
 * @Class PlayerComponent
 */

module.exports = React.createClass({

  componentDidMount: function () {
    this.player = videojs('player');
    window.onresize = this.resizePlayer;
  },

  componentWillUnmount: function () {
    window.onresize = null;
  },

  resizePlayer: function () {
    var w = windowSize();
    var video = document.getElementById('player');

    video.style.width = w.width + "px";
    video.style.height = w.height + "px";
  },

  render: function () {
    var sources, poster, r, w;

    sources = this.getSources('video')
      .map((media, index) => <source key={index} src={media.src} type={media.type} />);

    poster = Object.byString(this.getSources('image'), '[0].src') || '';

    w = windowSize();

    return (
      <div className="player">
        <video id="player" className="video-js vjs-default-skin"
          controls preload="none" width={w.width} height={w.height}
          poster={poster}>
          {sources}
          <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web
          browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
          </p>
        </video>
      </div>
    );
  },

  /**
   *
   * @param {String} type
   * @returns {Array}
   */
  getSources: function (type) {
    if (this.props.media) return this.props.media
      .filter(media => media.type === type)
      .map(media => transformMedia(media));

    return [];
  },

  getSourcesRatio: function () {
    if (this.props.media && this.props.media.length > 0) {

      var sources = this.props.media
        .filter(media => media.type === 'video');

      return sources[0].width / sources[0].height;
    } else {
      return 16 / 9;
    }
  }
});


/**
 * @param {Object} o
 * @param {String} s
 * @returns {Object}
 * @example
 *  Object.byString(someObj, 'part3[0].name');
 */

Object.byString = function (o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  while (a.length) {
    var n = a.shift();
    if (n in o) {
      o = o[n];
    } else {
      return;
    }
  }
  return o;
};

/**
 *
 * @param {Object} media
 * @returns {Object} {{src: *, type: *}}
 */
function transformMedia (media) {
  return {
    src: media.url
    , type: mimetype[media.fileExtension]
    , label: media.height + 'p' + (media.height >= 720 ? ' ' + wording('hd') : '')
  }
}

function windowSize () {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return {width: x, height: y};
}
