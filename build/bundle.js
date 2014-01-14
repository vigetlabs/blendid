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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvbWFpbi5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9DYW52YXMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL29iamVjdHMvRGlzcGxheU9iamVjdC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9GcmFtZXMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL29iamVjdHMvR3JhcGhpYy5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9JbnB1dC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9SZWN0YW5nbGUuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL29iamVjdHMvU291bmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxlQUFBOztBQUFBLENBQUEsRUFBYyxJ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Q0FDQyxHQUFBLEVBQUQsS0FBQTtDQTlCRCxFQTRCUTs7Q0E1QlIsRUFnQ00sQ0FBTixLQUFNO0NBQ0wsT0FBQSxJQUFBO0NBQUEsR0FBQSxLQUFBO0NBQ0MsRUFBYSxDQUFaLEVBQUQsR0FBQTtDQUFBLEdBQ2MsRUFBZCxLQUFBLENBQUE7Q0FDQSxFQUF1QixDQUFwQixDQUFNLENBQVQsSUFBRztDQUNGLEVBQXFCLENBQXBCLENBQUssR0FBTixHQUFBO0NBQ0MsR0FBQSxDQUFLLFVBQU47TUFGRCxFQUFBO0NBSUUsRUFBYyxDQUFkLEtBQXlCLENBQVgsQ0FBZixJQUFBO0NBQ0UsR0FBRCxDQUFDLFlBQUQ7Q0FEYyxDQUViLE9BRndCO1FBUDVCO01BREs7Q0FoQ04sRUFnQ007O0NBaENOLEVBNENPLEVBQVAsSUFBTztDQUNOLEdBQUEsQ0FBTTtDQUNMLEVBQVksQ0FBWixLQUFELEVBQUE7Q0E5Q0QsRUE0Q087O0NBNUNQLEVBZ0RRLEdBQVIsR0FBUTtDQUNQLEdBQUEsS0FBa0I7Q0FBakIsR0FBQSxDQUFLLFFBQU47TUFETztDQWhEUixFQWdEUTs7Q0FoRFIsRUFtRE0sQ0FBTixLQUFNO0NBQ0wsRUFBdUIsQ0FBdkIsQ0FBUyxLQUFOO0NBQ0YsR0FBQyxDQUFLLENBQU47Q0FBQSxFQUNxQixDQUFwQixDQUFLLENBQU4sS0FBQTtDQUNDLEVBQVksQ0FBWixLQUFELElBQUE7TUFKSTtDQW5ETixFQW1ETTs7Q0FuRE47O0NBREQ7O0FBMERBLENBMURBLEVBMERpQixFQTFEakIsQ0EwRE0sQ0FBTiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiQmxhc3RFbmdpbmUgPSByZXF1aXJlICcuL2JsYXN0RW5naW5lL21haW4nXG5lbmdpbmUgPSBuZXcgQmxhc3RFbmdpbmUoKVxuZW5naW5lLmRlbW8oKSIsIkNhbnZhcyA9IHJlcXVpcmUgJy4vb2JqZWN0cy9DYW52YXMnXG5Tb3VuZCA9IHJlcXVpcmUgJy4vb2JqZWN0cy9Tb3VuZCdcblJlY3RhbmdsZSA9IHJlcXVpcmUgJy4vb2JqZWN0cy9SZWN0YW5nbGUnXG5HcmFwaGljID0gcmVxdWlyZSAnLi9vYmplY3RzL0dyYXBoaWMnXG5JbnB1dCA9IHJlcXVpcmUgJy4vb2JqZWN0cy9JbnB1dCdcbkZyYW1lcyA9IHJlcXVpcmUgJy4vb2JqZWN0cy9GcmFtZXMnXG5cbmNsYXNzIEJsYXN0RW5naW5lXG5cdGRlbW86IC0+XG5cdFx0ZnJhbWVzID0gbmV3IEZyYW1lcygpXG5cdFx0aW5wdXQgPSBuZXcgSW5wdXRcblx0XHRcdDMyOiBcInNwYWNlYmFyXCJcblx0XHRcdDM3OiBcImxlZnRcIlxuXHRcdFx0Mzk6IFwicmlnaHRcIlxuXHRcdGNhbnZhcyA9ICBuZXcgQ2FudmFzIDEyMDAsIDY3NSwgJ2NhbnZhcy13cmFwcGVyJ1xuXHRcdHNvdW5kID0gbmV3IFNvdW5kKCdidWlsZC9hdWRpby9lbmVteS1oaXQnKVxuXHRcdHJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUgY2FudmFzLmN0eFxuXHRcdGdyYXBoaWMgPSBuZXcgR3JhcGhpYyBjYW52YXMuY3R4LCAnYnVpbGQvaW1hZ2VzL2VuZW15LnBuZycsXG5cdFx0XHR4OiAzMDBcblx0XHRcdHNwZWVkOiA1MDBcblx0XHRcdHk6IDEwMFxuXHRcdFx0aGVpZ2h0OiA4MVxuXHRcdFx0d2lkdGg6IDk3XG5cblx0XHRjYW52YXMuZWwuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuXHRcdFx0c291bmQucGxheSgpXG5cblx0XHRmcmFtZXMudXBkYXRlID0gPT5cblx0XHRcdGNhbnZhcy5jbGVhcigpXG5cblx0XHRcdGdyYXBoaWMudnggPSAwXG5cblx0XHRcdGlmIGlucHV0LnByZXNzZWQubGVmdFxuXHRcdFx0XHRncmFwaGljLnZ4ID0gZ3JhcGhpYy5zcGVlZCAqIGZyYW1lcy5kZWx0YSAqIC0xO1xuXG5cdFx0XHRpZiBpbnB1dC5wcmVzc2VkLnJpZ2h0XG5cdFx0XHRcdGdyYXBoaWMudnggPSBncmFwaGljLnNwZWVkICogZnJhbWVzLmRlbHRhO1xuXG5cdFx0XHRyZWN0YW5nbGUueCA9IDUwMCArIE1hdGguY29zKERhdGUubm93KCkvNTAwKSAqIDUwMFxuXHRcdFx0cmVjdGFuZ2xlLmRyYXcoKVxuXHRcdFx0Z3JhcGhpYy5kcmF3KClcblxuXHRcdGZyYW1lcy5wbGF5KClcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJsYXN0RW5naW5lIiwiY2xhc3MgQ2FudmFzXG4gIGNvbnN0cnVjdG9yOiAoQHdpZHRoLCBAaGVpZ2h0LCBAaWQpIC0+XG4gICAgQGNyZWF0ZSgpXG4gICAgQGFwcGVuZCgpXG5cbiAgYXBwZW5kOiAtPlxuICBcdGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChAaWQpIG9yIGRvY3VtZW50LmJvZHlcbiAgXHRlbGVtZW50LmFwcGVuZENoaWxkKEBlbClcblxuICBjbGVhcjogKGRpbWVuc2lvbnMpIC0+XG4gICAgeCA9IDBcbiAgICB5ID0gMFxuICAgIHdpZHRoID0gQHdpZHRoXG4gICAgaGVpZ2h0ID0gQGhlaWdodFxuXG4gICAgaWYgZGltZW5zaW9uc1xuICAgICAgeCA9IGRpbWVuc2lvbnMueCAtIDFcbiAgICAgIHkgPSBkaW1lbnNpb25zLnkgLSAxXG4gICAgICB3aWR0aCA9IGRpbWVuc2lvbnMud2lkdGggKyAyXG4gICAgICBoZWlnaHQgPSBkaW1lbnNpb25zLmhlaWdodCArIDJcblxuICAgIEBjdHguY2xlYXJSZWN0IHgsIHksIHdpZHRoLCBoZWlnaHRcblxuICBjcmVhdGU6IC0+XG4gICAgQGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuICAgIEBjdHggPSBAZWwuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgQGVsLndpZHRoID0gQHdpZHRoXG4gICAgQGVsLmhlaWdodCA9IEBoZWlnaHRcblxubW9kdWxlLmV4cG9ydHMgPSBDYW52YXMiLCJjbGFzcyBEaXNwbGF5T2JqZWN0XG5cdGNvbG9yOiBcImJsdWVcIlxuXHRoZWlnaHQ6IDEwMFxuXHRyb3RhdGlvbjogMFxuXHRzY2FsZTogMVxuXHR3aWR0aDogMTAwXG5cdHg6IDBcblx0eTogMFxuXHR2eDogMFxuXHR2eTogMFxuXG5cdGNvbnN0cnVjdG9yOiAoQGN0eCwgcHJvcGVydGllcykgLT5cblx0XHRAc2V0IHByb3BlcnRpZXMgaWYgcHJvcGVydGllc1xuXG5cdGV4dGVuZFdpdGg6IChwcm9wZXJ0aWVzKSAtPlxuXHRcdGZvciBwcm9wZXJ0eSBvZiBwcm9wZXJ0aWVzXG5cdFx0XHR0aGlzW3Byb3BlcnR5XSA9IHByb3BlcnRpZXNbcHJvcGVydHldXG5cblx0ZHJhdzogLT5cblx0XHRAY3R4LnNhdmUoKVxuXG5cdFx0IyBSb3VuZCB0byB3aG9sZSBwaXhlbFxuXHRcdHggPSAoQHggKz0gQHZ4KSArIDAuNSB8IDBcblx0XHR5ID0gKEB5ICs9IEB2eSkgKyAwLjUgfCAwXG5cblx0XHQjIEFwcGx5IFRyYW5zZm9ybWF0aW9ucyAoc2NhbGUgYW5kIHJvdGF0ZSBmcm9tIGNlbnRlcilcblx0XHRAY3R4LnRyYW5zbGF0ZSB4ICsgQHdpZHRoIC8gMiwgeSArIEBoZWlnaHQgLyAyXG5cdFx0QGN0eC5yb3RhdGUgQHJvdGF0aW9uXG5cdFx0QGN0eC5zY2FsZSBAc2NhbGUsIEBzY2FsZVxuXHRcdEBjdHgudHJhbnNsYXRlIC1Ad2lkdGggLyAyLCAtQGhlaWdodCAvIDJcblxuXHRcdCMgQ2FsbCBleHRlbmRlZCBPYmplY3QgVHlwZSdzIGRyYXcgbWV0aG9kXG5cdFx0QGRyYXdUeXBlIGFuZCBAZHJhd1R5cGUoKVxuXHRcdEBjdHgucmVzdG9yZSgpXG5cbm1vZHVsZS5leHBvcnRzID0gRGlzcGxheU9iamVjdCIsImNsYXNzIEZyYW1lc1xuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRAZGVsdGEgPSAwXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIEBwYXVzZSwgZmFsc2Vcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcImZvY3VzXCIsIEBwbGF5LCBmYWxzZVxuXG5cdHVwZGF0ZTogLT4gIyBPdmVyd3JpdGUgd2l0aCBnYW1lIGZpbGVcblxuXHRsb29wOiA9PlxuXHRcdEBzZXREZWx0YSgpXG5cdFx0QHVwZGF0ZSgpXG5cdFx0QGFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSBAbG9vcFxuXG5cdHBhdXNlOiA9PlxuXHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSBAYW5pbWF0aW9uRnJhbWVcblx0XHRAaXNQbGF5aW5nID0gZmFsc2VcblxuXHRwbGF5OiA9PlxuXHRcdHVubGVzcyBAaXNQbGF5aW5nXG5cdFx0XHRAaXNQbGF5aW5nID0gdHJ1ZVxuXHRcdFx0QHRoZW4gPSBEYXRlLm5vdygpXG5cdFx0XHRAbG9vcCgpXG5cblx0c2V0RGVsdGE6IC0+XG5cdFx0QG5vdyA9IERhdGUubm93KClcblx0XHRAZGVsdGEgPSAoQG5vdyAtIEB0aGVuKSAvIDEwMDAgIyBzZWNvbmRzIHNpbmNlIGxhc3QgZnJhbWVcblx0XHRAdGhlbiA9IEBub3dcblxubW9kdWxlLmV4cG9ydHMgPSBGcmFtZXMiLCJEaXNwbGF5T2JqZWN0ID0gcmVxdWlyZSgnLi9EaXNwbGF5T2JqZWN0JylcblxuY2xhc3MgR3JhcGhpYyBleHRlbmRzIERpc3BsYXlPYmplY3Rcblx0Y29uc3RydWN0b3I6IChAY3R4LCBAc3JjLCBvcHRpb25zKSAtPlxuXHRcdEBleHRlbmRXaXRoKG9wdGlvbnMpO1xuXHRcdEBjcmVhdGVJbWFnZSgpXG5cdFx0QGxvYWQoKVxuXG5cdGNyZWF0ZUltYWdlOiAtPlxuXHRcdEBpbWFnZSA9IG5ldyBJbWFnZSgpXG5cdFx0QGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgQHNyYylcblxuXHRkcmF3VHlwZTogLT5cblx0XHRpZiBAcmVhZHlcblx0XHRcdEBjdHguZHJhd0ltYWdlIEBpbWFnZSwgMCwgMFxuXHRcdGVsc2Vcblx0XHRcdEBpbWFnZS5vbmxvYWQgPSA9PlxuXHRcdFx0XHRAcmVhZHkgPSB0cnVlXG5cdFx0XHRcdEBkcmF3XG5cblx0bG9hZDogLT5cblx0XHRAcmVhZHkgPSBmYWxzZVxuXHRcdEBpbWFnZSA9IG5ldyBJbWFnZSgpXG5cdFx0QGltYWdlLnNyYyA9IEBzcmNcblx0XHRAaW1hZ2Uub25sb2FkID0gPT4gQHJlYWR5ID0gdHJ1ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYXBoaWMiLCJjbGFzcyBJbnB1dFxuXHRjb25zdHJ1Y3RvcjogKEBrZXlzKSAtPlxuXHRcdEBwcmVzc2VkID0ge31cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsIEBrZXlJbnRlcmFjdGlvblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwia2V5ZG93blwiLCBAa2V5SW50ZXJhY3Rpb25cblxuXHRrZXlJbnRlcmFjdGlvbjogKGV2ZW50KSA9PlxuXHRcdGNvZGUgPSBldmVudC5rZXlDb2RlXG5cdFx0aWYgQGtleXNbY29kZV1cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblx0XHRcdEBwcmVzc2VkW0BrZXlzW2NvZGVdXSA9IGV2ZW50LnR5cGUgaXMgXCJrZXlkb3duXCJcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dCIsIkRpc3BsYXlPYmplY3QgPSByZXF1aXJlKCcuL0Rpc3BsYXlPYmplY3QnKVxuXG5jbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG4gIGNvbnN0cnVjdG9yOiAoY3R4LCBwcm9wZXJ0aWVzKSAtPlxuICAgIHN1cGVyIGN0eCwgcHJvcGVydGllc1xuXG4gIGRyYXdUeXBlOiAtPlxuICAgIEBjdHguZmlsbFN0eWxlID0gQGNvbG9yXG4gICAgQGN0eC5maWxsUmVjdCAwLCAwLCBAd2lkdGgsIEBoZWlnaHRcbiAgICBAY3R4LmZpbGwoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY3RhbmdsZSIsImNsYXNzIFNvdW5kXG5cdGZpbGVUeXBlczogW1wib2dnXCIsIFwibXAzXCJdXG5cblx0Y29uc3RydWN0b3I6IChAc3JjLCBsb29wcykgLT5cblx0XHRAaXNFbmFibGVkID0gdHJ1ZVxuXHRcdEBjcmVhdGVBdWRpb0VsZW1lbnQgbG9vcHNcblx0XHRAZmlsZVR5cGVzLmZvckVhY2ggQGFkZFNvdXJjZVxuXHRcdG5vdCBsb29wcyAmIEBjaGFuZ2VQbGF5U3RhdGVPbkVuZGVkKClcblxuXHRhZGRTb3VyY2U6IChleHRlbnRpb24pID0+XG5cdFx0c291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNvdXJjZVwiKVxuXHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIFwiI3tAc3JjfS4je2V4dGVudGlvbn1cIilcblx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlICd0eXBlJywgXCJhdWRpby8je2V4dGVudGlvbn1cIlxuXHRcdEBhdWRpby5hcHBlbmRDaGlsZCBzb3VyY2VcblxuXHRjcmVhdGVBdWRpb0VsZW1lbnQ6IChsb29wcykgLT5cblx0XHRAYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIilcblx0XHRAYXVkaW8ucHJlbG9hZCA9IFwiYXV0b1wiXG5cdFx0QGF1ZGlvLmxvb3AgPSAhIWxvb3BzXG5cblx0Y2hhbmdlUGxheVN0YXRlT25FbmRlZDogLT5cblx0XHRAYXVkaW8uYWRkRXZlbnRMaXN0ZW5lciBcImVuZGVkXCIsID0+XG5cdFx0XHRAaXNQbGF5aW5nID0gZmFsc2Vcblx0XHQsIGZhbHNlXG5cblx0ZGlzYWJsZTogLT5cblx0XHRAYXVkaW8ucGF1c2UoKVxuXHRcdEBpc0VuYWJsZWQgPSBmYWxzZVxuXG5cdGVuYWJsZTogLT5cblx0XHRAaXNFbmFibGVkID0gdHJ1ZVxuXHRcdEByZXN1bWUoKVxuXG5cdHBsYXk6IC0+XG5cdFx0aWYgQGlzRW5hYmxlZFxuXHRcdFx0QGlzUGxheWluZyA9IHRydWVcblx0XHRcdGNsZWFyVGltZW91dCBAcGxheVRpbWVvdXRcblx0XHRcdGlmIEBhdWRpby5yZWFkeVN0YXRlID4gMVxuXHRcdFx0XHRAYXVkaW8uY3VycmVudFRpbWUgPSAwXG5cdFx0XHRcdEBhdWRpby5wbGF5KClcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHBsYXlUaW1lb3V0ID0gc2V0VGltZW91dCg9PlxuXHRcdFx0XHRcdEBwbGF5KClcblx0XHRcdFx0LCAyMClcblxuXHRwYXVzZTogLT5cblx0XHRAYXVkaW8ucGF1c2UoKVxuXHRcdEBpc1BsYXlpbmcgPSBmYWxzZVxuXG5cdHJlc3VtZTogLT5cblx0XHRAYXVkaW8ucGxheSgpICBpZiBAaXNFbmFibGVkIGFuZCBAaXNQbGF5aW5nXG5cblx0c3RvcDogLT5cblx0XHRpZiBAYXVkaW8ucmVhZHlTdGF0ZSA+IDFcblx0XHRcdEBhdWRpby5wYXVzZSgpXG5cdFx0XHRAYXVkaW8uY3VycmVudFRpbWUgPSAwXG5cdFx0XHRAaXNQbGF5aW5nID0gZmFsc2VcblxubW9kdWxlLmV4cG9ydHMgPSBTb3VuZFxuIl19
