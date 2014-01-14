(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BlastEngine, engine;

BlastEngine = require('./blastEngine/main');

engine = new BlastEngine();

engine.demo();


},{"./blastEngine/main":2}],2:[function(require,module,exports){
var BlastEngine, Canvas, Frames, Graphic, Input, Rectangle, Sound;

Canvas = require('./objects/Canvas');

Sound = require('./objects/Sound');

Rectangle = require('./objects/Rectangle');

Graphic = require('./objects/Graphic');

Input = require('./objects/Input');

Frames = require('./objects/Frames');

BlastEngine = (function() {
  function BlastEngine() {}

  BlastEngine.prototype.demo = function() {
    var canvas, frames, graphic, input, rectangle, sound,
      _this = this;
    frames = new Frames();
    input = new Input({
      32: "spacebar",
      37: "left",
      39: "right"
    });
    canvas = new Canvas(1200, 675, 'canvas-wrapper');
    sound = new Sound('build/audio/enemy-hit');
    rectangle = new Rectangle(canvas.ctx);
    graphic = new Graphic(canvas.ctx, 'build/images/enemy.png', {
      x: 300,
      speed: 500,
      y: 100,
      height: 81,
      width: 97
    });
    canvas.el.addEventListener('click', function() {
      return sound.play();
    });
    frames.update = function() {
      canvas.clear();
      graphic.vx = 0;
      if (input.pressed.left) {
        graphic.vx = graphic.speed * frames.delta * -1;
        console.log(graphic.speed * frames.delta * -1);
      }
      if (input.pressed.right) {
        graphic.vx = graphic.speed * frames.delta;
      }
      rectangle.x = 500 + Math.cos(Date.now() / 500) * 500;
      rectangle.draw();
      return graphic.draw();
    };
    return frames.play();
  };

  return BlastEngine;

})();

module.exports = BlastEngine;


},{"./objects/Canvas":3,"./objects/Frames":5,"./objects/Graphic":6,"./objects/Input":7,"./objects/Rectangle":8,"./objects/Sound":9}],3:[function(require,module,exports){
var Canvas;

Canvas = (function() {
  function Canvas(width, height, id) {
    this.width = width;
    this.height = height;
    this.id = id;
    this.create();
    this.append();
  }

  Canvas.prototype.append = function() {
    var element;
    element = document.getElementById(this.id) || document.body;
    return element.appendChild(this.el);
  };

  Canvas.prototype.clear = function(dimensions) {
    var height, width, x, y;
    x = 0;
    y = 0;
    width = this.width;
    height = this.height;
    if (dimensions) {
      x = dimensions.x - 1;
      y = dimensions.y - 1;
      width = dimensions.width + 2;
      height = dimensions.height + 2;
    }
    return this.ctx.clearRect(x, y, width, height);
  };

  Canvas.prototype.create = function() {
    this.el = document.createElement("canvas");
    this.ctx = this.el.getContext("2d");
    this.el.width = this.width;
    return this.el.height = this.height;
  };

  return Canvas;

})();

module.exports = Canvas;


},{}],4:[function(require,module,exports){
var DisplayObject;

DisplayObject = (function() {
  DisplayObject.prototype.color = "blue";

  DisplayObject.prototype.height = 100;

  DisplayObject.prototype.rotation = 0;

  DisplayObject.prototype.scale = 1;

  DisplayObject.prototype.width = 100;

  DisplayObject.prototype.x = 0;

  DisplayObject.prototype.y = 0;

  DisplayObject.prototype.vx = 0;

  DisplayObject.prototype.vy = 0;

  function DisplayObject(ctx, properties) {
    this.ctx = ctx;
    if (properties) {
      this.set(properties);
    }
  }

  DisplayObject.prototype.extendWith = function(properties) {
    var property, _results;
    _results = [];
    for (property in properties) {
      _results.push(this[property] = properties[property]);
    }
    return _results;
  };

  DisplayObject.prototype.draw = function() {
    var x, y;
    this.ctx.save();
    x = (this.x += this.vx) + 0.5 | 0;
    y = (this.y += this.vy) + 0.5 | 0;
    this.ctx.translate(x + this.width / 2, y + this.height / 2);
    this.ctx.rotate(this.rotation);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.translate(-this.width / 2, -this.height / 2);
    this.drawType && this.drawType();
    return this.ctx.restore();
  };

  return DisplayObject;

})();

module.exports = DisplayObject;


},{}],5:[function(require,module,exports){
var Frames,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Frames = (function() {
  function Frames() {
    this.play = __bind(this.play, this);
    this.pause = __bind(this.pause, this);
    this.loop = __bind(this.loop, this);
    this.delta = 0;
    window.addEventListener("blur", this.pause, false);
    window.addEventListener("focus", this.play, false);
  }

  Frames.prototype.update = function() {};

  Frames.prototype.loop = function() {
    this.setDelta();
    this.update();
    return this.animationFrame = window.requestAnimationFrame(this.loop);
  };

  Frames.prototype.pause = function() {
    window.cancelAnimationFrame(this.animationFrame);
    return this.isPlaying = false;
  };

  Frames.prototype.play = function() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.then = Date.now();
      return this.loop();
    }
  };

  Frames.prototype.setDelta = function() {
    this.now = Date.now();
    this.delta = (this.now - this.then) / 1000;
    return this.then = this.now;
  };

  return Frames;

})();

module.exports = Frames;


},{}],6:[function(require,module,exports){
var DisplayObject, Graphic,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DisplayObject = require('./DisplayObject');

Graphic = (function(_super) {
  __extends(Graphic, _super);

  function Graphic(ctx, src, options) {
    this.ctx = ctx;
    this.src = src;
    this.extendWith(options);
    this.createImage();
    this.load();
  }

  Graphic.prototype.createImage = function() {
    this.image = new Image();
    return this.image.setAttribute('src', this.src);
  };

  Graphic.prototype.drawType = function() {
    var _this = this;
    if (this.ready) {
      return this.ctx.drawImage(this.image, 0, 0);
    } else {
      return this.image.onload = function() {
        _this.ready = true;
        return _this.draw;
      };
    }
  };

  Graphic.prototype.load = function() {
    var _this = this;
    this.ready = false;
    this.image = new Image();
    this.image.src = this.src;
    return this.image.onload = function() {
      return _this.ready = true;
    };
  };

  return Graphic;

})(DisplayObject);

module.exports = Graphic;


},{"./DisplayObject":4}],7:[function(require,module,exports){
var Input,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Input = (function() {
  function Input(keys) {
    this.keys = keys;
    this.keyInteraction = __bind(this.keyInteraction, this);
    this.pressed = {};
    window.addEventListener("keyup", this.keyInteraction);
    window.addEventListener("keydown", this.keyInteraction);
  }

  Input.prototype.keyInteraction = function(event) {
    var code;
    code = event.keyCode;
    if (this.keys[code]) {
      event.preventDefault();
      return this.pressed[this.keys[code]] = event.type === "keydown";
    }
  };

  return Input;

})();

module.exports = Input;


},{}],8:[function(require,module,exports){
var DisplayObject, Rectangle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DisplayObject = require('./DisplayObject');

Rectangle = (function(_super) {
  __extends(Rectangle, _super);

  function Rectangle(ctx, properties) {
    Rectangle.__super__.constructor.call(this, ctx, properties);
  }

  Rectangle.prototype.drawType = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
    return this.ctx.fill();
  };

  return Rectangle;

})(DisplayObject);

module.exports = Rectangle;


},{"./DisplayObject":4}],9:[function(require,module,exports){
var Sound,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Sound = (function() {
  Sound.prototype.fileTypes = ["ogg", "mp3"];

  function Sound(src, loops) {
    this.src = src;
    this.addSource = __bind(this.addSource, this);
    this.isEnabled = true;
    this.createAudioElement(loops);
    this.fileTypes.forEach(this.addSource);
    !loops & this.changePlayStateOnEnded();
  }

  Sound.prototype.addSource = function(extention) {
    var source;
    source = document.createElement("source");
    source.setAttribute('src', "" + this.src + "." + extention);
    source.setAttribute('type', "audio/" + extention);
    return this.audio.appendChild(source);
  };

  Sound.prototype.createAudioElement = function(loops) {
    this.audio = document.createElement("audio");
    this.audio.preload = "auto";
    return this.audio.loop = !!loops;
  };

  Sound.prototype.changePlayStateOnEnded = function() {
    var _this = this;
    return this.audio.addEventListener("ended", function() {
      return _this.isPlaying = false;
    }, false);
  };

  Sound.prototype.disable = function() {
    this.audio.pause();
    return this.isEnabled = false;
  };

  Sound.prototype.enable = function() {
    this.isEnabled = true;
    return this.resume();
  };

  Sound.prototype.play = function() {
    var _this = this;
    if (this.isEnabled) {
      this.isPlaying = true;
      clearTimeout(this.playTimeout);
      if (this.audio.readyState > 1) {
        this.audio.currentTime = 0;
        return this.audio.play();
      } else {
        return this.playTimeout = setTimeout(function() {
          return _this.play();
        }, 20);
      }
    }
  };

  Sound.prototype.pause = function() {
    this.audio.pause();
    return this.isPlaying = false;
  };

  Sound.prototype.resume = function() {
    if (this.isEnabled && this.isPlaying) {
      return this.audio.play();
    }
  };

  Sound.prototype.stop = function() {
    if (this.audio.readyState > 1) {
      this.audio.pause();
      this.audio.currentTime = 0;
      return this.isPlaying = false;
    }
  };

  return Sound;

})();

module.exports = Sound;


},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvbWFpbi5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9DYW52YXMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL29iamVjdHMvRGlzcGxheU9iamVjdC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9GcmFtZXMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL29iamVjdHMvR3JhcGhpYy5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9JbnB1dC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9SZWN0YW5nbGUuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL29iamVjdHMvU291bmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxlQUFBOztBQUFBLENBQUEsRUFBYyxJ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eEJULEVBNEJRLEdBQVIsR0FBUTtDQUNQLEVBQWEsQ0FBYixLQUFBO0NBQ0MsR0FBQSxFQUFELEtBQUE7Q0E5QkQsRUE0QlE7O0NBNUJSLEVBZ0NNLENBQU4sS0FBTTtDQUNMLE9BQUEsSUFBQTtDQUFBLEdBQUEsS0FBQTtDQUNDLEVBQWEsQ0FBWixFQUFELEdBQUE7Q0FBQSxHQUNjLEVBQWQsS0FBQSxDQUFBO0NBQ0EsRUFBdUIsQ0FBcEIsQ0FBTSxDQUFULElBQUc7Q0FDRixFQUFxQixDQUFwQixDQUFLLEdBQU4sR0FBQTtDQUNDLEdBQUEsQ0FBSyxVQUFOO01BRkQsRUFBQTtDQUlFLEVBQWMsQ0FBZCxLQUF5QixDQUFYLENBQWYsSUFBQTtDQUNFLEdBQUQsQ0FBQyxZQUFEO0NBRGMsQ0FFYixPQUZ3QjtRQVA1QjtNQURLO0NBaENOLEVBZ0NNOztDQWhDTixFQTRDTyxFQUFQLElBQU87Q0FDTixHQUFBLENBQU07Q0FDTCxFQUFZLENBQVosS0FBRCxFQUFBO0NBOUNELEVBNENPOztDQTVDUCxFQWdEUSxHQUFSLEdBQVE7Q0FDUCxHQUFBLEtBQWtCO0NBQWpCLEdBQUEsQ0FBSyxRQUFOO01BRE87Q0FoRFIsRUFnRFE7O0NBaERSLEVBbURNLENBQU4sS0FBTTtDQUNMLEVBQXVCLENBQXZCLENBQVMsS0FBTjtDQUNGLEdBQUMsQ0FBSyxDQUFOO0NBQUEsRUFDcUIsQ0FBcEIsQ0FBSyxDQUFOLEtBQUE7Q0FDQyxFQUFZLENBQVosS0FBRCxJQUFBO01BSkk7Q0FuRE4sRUFtRE07O0NBbkROOztDQUREOztBQTBEQSxDQTFEQSxFQTBEaUIsRUExRGpCLENBMERNLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkJsYXN0RW5naW5lID0gcmVxdWlyZSAnLi9ibGFzdEVuZ2luZS9tYWluJ1xuZW5naW5lID0gbmV3IEJsYXN0RW5naW5lKClcbmVuZ2luZS5kZW1vKCkiLCJDYW52YXMgPSByZXF1aXJlICcuL29iamVjdHMvQ2FudmFzJ1xuU291bmQgPSByZXF1aXJlICcuL29iamVjdHMvU291bmQnXG5SZWN0YW5nbGUgPSByZXF1aXJlICcuL29iamVjdHMvUmVjdGFuZ2xlJ1xuR3JhcGhpYyA9IHJlcXVpcmUgJy4vb2JqZWN0cy9HcmFwaGljJ1xuSW5wdXQgPSByZXF1aXJlICcuL29iamVjdHMvSW5wdXQnXG5GcmFtZXMgPSByZXF1aXJlICcuL29iamVjdHMvRnJhbWVzJ1xuXG5jbGFzcyBCbGFzdEVuZ2luZVxuXHRkZW1vOiAtPlxuXHRcdGZyYW1lcyA9IG5ldyBGcmFtZXMoKVxuXHRcdGlucHV0ID0gbmV3IElucHV0XG5cdFx0XHQzMjogXCJzcGFjZWJhclwiXG5cdFx0XHQzNzogXCJsZWZ0XCJcblx0XHRcdDM5OiBcInJpZ2h0XCJcblx0XHRjYW52YXMgPSAgbmV3IENhbnZhcyAxMjAwLCA2NzUsICdjYW52YXMtd3JhcHBlcidcblx0XHRzb3VuZCA9IG5ldyBTb3VuZCgnYnVpbGQvYXVkaW8vZW5lbXktaGl0Jylcblx0XHRyZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlIGNhbnZhcy5jdHhcblx0XHRncmFwaGljID0gbmV3IEdyYXBoaWMgY2FudmFzLmN0eCwgJ2J1aWxkL2ltYWdlcy9lbmVteS5wbmcnLFxuXHRcdFx0eDogMzAwXG5cdFx0XHRzcGVlZDogNTAwXG5cdFx0XHR5OiAxMDBcblx0XHRcdGhlaWdodDogODFcblx0XHRcdHdpZHRoOiA5N1xuXG5cdFx0Y2FudmFzLmVsLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cblx0XHRcdHNvdW5kLnBsYXkoKVxuXG5cdFx0ZnJhbWVzLnVwZGF0ZSA9ID0+XG5cdFx0XHRjYW52YXMuY2xlYXIoKVxuXG5cdFx0XHRncmFwaGljLnZ4ID0gMFxuXG5cdFx0XHRpZiBpbnB1dC5wcmVzc2VkLmxlZnRcblx0XHRcdFx0Z3JhcGhpYy52eCA9IGdyYXBoaWMuc3BlZWQgKiBmcmFtZXMuZGVsdGEgKiAtMTtcblx0XHRcdFx0Y29uc29sZS5sb2cgZ3JhcGhpYy5zcGVlZCAqIGZyYW1lcy5kZWx0YSAqIC0xXG5cblx0XHRcdGlmIGlucHV0LnByZXNzZWQucmlnaHRcblx0XHRcdFx0Z3JhcGhpYy52eCA9IGdyYXBoaWMuc3BlZWQgKiBmcmFtZXMuZGVsdGE7XG5cblx0XHRcdHJlY3RhbmdsZS54ID0gNTAwICsgTWF0aC5jb3MoRGF0ZS5ub3coKS81MDApICogNTAwXG5cdFx0XHRyZWN0YW5nbGUuZHJhdygpXG5cdFx0XHRncmFwaGljLmRyYXcoKVxuXG5cdFx0ZnJhbWVzLnBsYXkoKVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQmxhc3RFbmdpbmUiLCJjbGFzcyBDYW52YXNcbiAgY29uc3RydWN0b3I6IChAd2lkdGgsIEBoZWlnaHQsIEBpZCkgLT5cbiAgICBAY3JlYXRlKClcbiAgICBAYXBwZW5kKClcblxuICBhcHBlbmQ6IC0+XG4gIFx0ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEBpZCkgb3IgZG9jdW1lbnQuYm9keVxuICBcdGVsZW1lbnQuYXBwZW5kQ2hpbGQoQGVsKVxuXG4gIGNsZWFyOiAoZGltZW5zaW9ucykgLT5cbiAgICB4ID0gMFxuICAgIHkgPSAwXG4gICAgd2lkdGggPSBAd2lkdGhcbiAgICBoZWlnaHQgPSBAaGVpZ2h0XG5cbiAgICBpZiBkaW1lbnNpb25zXG4gICAgICB4ID0gZGltZW5zaW9ucy54IC0gMVxuICAgICAgeSA9IGRpbWVuc2lvbnMueSAtIDFcbiAgICAgIHdpZHRoID0gZGltZW5zaW9ucy53aWR0aCArIDJcbiAgICAgIGhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0ICsgMlxuXG4gICAgQGN0eC5jbGVhclJlY3QgeCwgeSwgd2lkdGgsIGhlaWdodFxuXG4gIGNyZWF0ZTogLT5cbiAgICBAZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXG4gICAgQGN0eCA9IEBlbC5nZXRDb250ZXh0KFwiMmRcIilcbiAgICBAZWwud2lkdGggPSBAd2lkdGhcbiAgICBAZWwuaGVpZ2h0ID0gQGhlaWdodFxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbnZhcyIsImNsYXNzIERpc3BsYXlPYmplY3Rcblx0Y29sb3I6IFwiYmx1ZVwiXG5cdGhlaWdodDogMTAwXG5cdHJvdGF0aW9uOiAwXG5cdHNjYWxlOiAxXG5cdHdpZHRoOiAxMDBcblx0eDogMFxuXHR5OiAwXG5cdHZ4OiAwXG5cdHZ5OiAwXG5cblx0Y29uc3RydWN0b3I6IChAY3R4LCBwcm9wZXJ0aWVzKSAtPlxuXHRcdEBzZXQgcHJvcGVydGllcyBpZiBwcm9wZXJ0aWVzXG5cblx0ZXh0ZW5kV2l0aDogKHByb3BlcnRpZXMpIC0+XG5cdFx0Zm9yIHByb3BlcnR5IG9mIHByb3BlcnRpZXNcblx0XHRcdHRoaXNbcHJvcGVydHldID0gcHJvcGVydGllc1twcm9wZXJ0eV1cblxuXHRkcmF3OiAtPlxuXHRcdEBjdHguc2F2ZSgpXG5cblx0XHQjIFJvdW5kIHRvIHdob2xlIHBpeGVsXG5cdFx0eCA9IChAeCArPSBAdngpICsgMC41IHwgMFxuXHRcdHkgPSAoQHkgKz0gQHZ5KSArIDAuNSB8IDBcblxuXHRcdCMgQXBwbHkgVHJhbnNmb3JtYXRpb25zIChzY2FsZSBhbmQgcm90YXRlIGZyb20gY2VudGVyKVxuXHRcdEBjdHgudHJhbnNsYXRlIHggKyBAd2lkdGggLyAyLCB5ICsgQGhlaWdodCAvIDJcblx0XHRAY3R4LnJvdGF0ZSBAcm90YXRpb25cblx0XHRAY3R4LnNjYWxlIEBzY2FsZSwgQHNjYWxlXG5cdFx0QGN0eC50cmFuc2xhdGUgLUB3aWR0aCAvIDIsIC1AaGVpZ2h0IC8gMlxuXG5cdFx0IyBDYWxsIGV4dGVuZGVkIE9iamVjdCBUeXBlJ3MgZHJhdyBtZXRob2Rcblx0XHRAZHJhd1R5cGUgYW5kIEBkcmF3VHlwZSgpXG5cdFx0QGN0eC5yZXN0b3JlKClcblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwbGF5T2JqZWN0IiwiY2xhc3MgRnJhbWVzXG5cdGNvbnN0cnVjdG9yOiAtPlxuXHRcdEBkZWx0YSA9IDBcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgQHBhdXNlLCBmYWxzZVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgQHBsYXksIGZhbHNlXG5cblx0dXBkYXRlOiAtPiAjIE92ZXJ3cml0ZSB3aXRoIGdhbWUgZmlsZVxuXG5cdGxvb3A6ID0+XG5cdFx0QHNldERlbHRhKClcblx0XHRAdXBkYXRlKClcblx0XHRAYW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBsb29wXG5cblx0cGF1c2U6ID0+XG5cdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIEBhbmltYXRpb25GcmFtZVxuXHRcdEBpc1BsYXlpbmcgPSBmYWxzZVxuXG5cdHBsYXk6ID0+XG5cdFx0dW5sZXNzIEBpc1BsYXlpbmdcblx0XHRcdEBpc1BsYXlpbmcgPSB0cnVlXG5cdFx0XHRAdGhlbiA9IERhdGUubm93KClcblx0XHRcdEBsb29wKClcblxuXHRzZXREZWx0YTogLT5cblx0XHRAbm93ID0gRGF0ZS5ub3coKVxuXHRcdEBkZWx0YSA9IChAbm93IC0gQHRoZW4pIC8gMTAwMCAjIHNlY29uZHMgc2luY2UgbGFzdCBmcmFtZVxuXHRcdEB0aGVuID0gQG5vd1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZyYW1lcyIsIkRpc3BsYXlPYmplY3QgPSByZXF1aXJlKCcuL0Rpc3BsYXlPYmplY3QnKVxuXG5jbGFzcyBHcmFwaGljIGV4dGVuZHMgRGlzcGxheU9iamVjdFxuXHRjb25zdHJ1Y3RvcjogKEBjdHgsIEBzcmMsIG9wdGlvbnMpIC0+XG5cdFx0QGV4dGVuZFdpdGgob3B0aW9ucyk7XG5cdFx0QGNyZWF0ZUltYWdlKClcblx0XHRAbG9hZCgpXG5cblx0Y3JlYXRlSW1hZ2U6IC0+XG5cdFx0QGltYWdlID0gbmV3IEltYWdlKClcblx0XHRAaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBAc3JjKVxuXG5cdGRyYXdUeXBlOiAtPlxuXHRcdGlmIEByZWFkeVxuXHRcdFx0QGN0eC5kcmF3SW1hZ2UgQGltYWdlLCAwLCAwXG5cdFx0ZWxzZVxuXHRcdFx0QGltYWdlLm9ubG9hZCA9ID0+XG5cdFx0XHRcdEByZWFkeSA9IHRydWVcblx0XHRcdFx0QGRyYXdcblxuXHRsb2FkOiAtPlxuXHRcdEByZWFkeSA9IGZhbHNlXG5cdFx0QGltYWdlID0gbmV3IEltYWdlKClcblx0XHRAaW1hZ2Uuc3JjID0gQHNyY1xuXHRcdEBpbWFnZS5vbmxvYWQgPSA9PiBAcmVhZHkgPSB0cnVlXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhcGhpYyIsImNsYXNzIElucHV0XG5cdGNvbnN0cnVjdG9yOiAoQGtleXMpIC0+XG5cdFx0QHByZXNzZWQgPSB7fVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwia2V5dXBcIiwgQGtleUludGVyYWN0aW9uXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIEBrZXlJbnRlcmFjdGlvblxuXG5cdGtleUludGVyYWN0aW9uOiAoZXZlbnQpID0+XG5cdFx0Y29kZSA9IGV2ZW50LmtleUNvZGVcblx0XHRpZiBAa2V5c1tjb2RlXVxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRcdFx0QHByZXNzZWRbQGtleXNbY29kZV1dID0gZXZlbnQudHlwZSBpcyBcImtleWRvd25cIlxuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0IiwiRGlzcGxheU9iamVjdCA9IHJlcXVpcmUoJy4vRGlzcGxheU9iamVjdCcpXG5cbmNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIERpc3BsYXlPYmplY3RcbiAgY29uc3RydWN0b3I6IChjdHgsIHByb3BlcnRpZXMpIC0+XG4gICAgc3VwZXIgY3R4LCBwcm9wZXJ0aWVzXG5cbiAgZHJhd1R5cGU6IC0+XG4gICAgQGN0eC5maWxsU3R5bGUgPSBAY29sb3JcbiAgICBAY3R4LmZpbGxSZWN0IDAsIDAsIEB3aWR0aCwgQGhlaWdodFxuICAgIEBjdHguZmlsbCgpXG5cbm1vZHVsZS5leHBvcnRzID0gUmVjdGFuZ2xlIiwiY2xhc3MgU291bmRcblx0ZmlsZVR5cGVzOiBbXCJvZ2dcIiwgXCJtcDNcIl1cblxuXHRjb25zdHJ1Y3RvcjogKEBzcmMsIGxvb3BzKSAtPlxuXHRcdEBpc0VuYWJsZWQgPSB0cnVlXG5cdFx0QGNyZWF0ZUF1ZGlvRWxlbWVudCBsb29wc1xuXHRcdEBmaWxlVHlwZXMuZm9yRWFjaCBAYWRkU291cmNlXG5cdFx0bm90IGxvb3BzICYgQGNoYW5nZVBsYXlTdGF0ZU9uRW5kZWQoKVxuXG5cdGFkZFNvdXJjZTogKGV4dGVudGlvbikgPT5cblx0XHRzb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic291cmNlXCIpXG5cdFx0c291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgXCIje0BzcmN9LiN7ZXh0ZW50aW9ufVwiKVxuXHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUgJ3R5cGUnLCBcImF1ZGlvLyN7ZXh0ZW50aW9ufVwiXG5cdFx0QGF1ZGlvLmFwcGVuZENoaWxkIHNvdXJjZVxuXG5cdGNyZWF0ZUF1ZGlvRWxlbWVudDogKGxvb3BzKSAtPlxuXHRcdEBhdWRpbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiKVxuXHRcdEBhdWRpby5wcmVsb2FkID0gXCJhdXRvXCJcblx0XHRAYXVkaW8ubG9vcCA9ICEhbG9vcHNcblxuXHRjaGFuZ2VQbGF5U3RhdGVPbkVuZGVkOiAtPlxuXHRcdEBhdWRpby5hZGRFdmVudExpc3RlbmVyIFwiZW5kZWRcIiwgPT5cblx0XHRcdEBpc1BsYXlpbmcgPSBmYWxzZVxuXHRcdCwgZmFsc2VcblxuXHRkaXNhYmxlOiAtPlxuXHRcdEBhdWRpby5wYXVzZSgpXG5cdFx0QGlzRW5hYmxlZCA9IGZhbHNlXG5cblx0ZW5hYmxlOiAtPlxuXHRcdEBpc0VuYWJsZWQgPSB0cnVlXG5cdFx0QHJlc3VtZSgpXG5cblx0cGxheTogLT5cblx0XHRpZiBAaXNFbmFibGVkXG5cdFx0XHRAaXNQbGF5aW5nID0gdHJ1ZVxuXHRcdFx0Y2xlYXJUaW1lb3V0IEBwbGF5VGltZW91dFxuXHRcdFx0aWYgQGF1ZGlvLnJlYWR5U3RhdGUgPiAxXG5cdFx0XHRcdEBhdWRpby5jdXJyZW50VGltZSA9IDBcblx0XHRcdFx0QGF1ZGlvLnBsYXkoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAcGxheVRpbWVvdXQgPSBzZXRUaW1lb3V0KD0+XG5cdFx0XHRcdFx0QHBsYXkoKVxuXHRcdFx0XHQsIDIwKVxuXG5cdHBhdXNlOiAtPlxuXHRcdEBhdWRpby5wYXVzZSgpXG5cdFx0QGlzUGxheWluZyA9IGZhbHNlXG5cblx0cmVzdW1lOiAtPlxuXHRcdEBhdWRpby5wbGF5KCkgIGlmIEBpc0VuYWJsZWQgYW5kIEBpc1BsYXlpbmdcblxuXHRzdG9wOiAtPlxuXHRcdGlmIEBhdWRpby5yZWFkeVN0YXRlID4gMVxuXHRcdFx0QGF1ZGlvLnBhdXNlKClcblx0XHRcdEBhdWRpby5jdXJyZW50VGltZSA9IDBcblx0XHRcdEBpc1BsYXlpbmcgPSBmYWxzZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNvdW5kXG4iXX0=
