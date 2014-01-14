(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BlastEngine, engine;

BlastEngine = require('./blastEngine/main');

engine = new BlastEngine();


},{"./blastEngine/main":2}],2:[function(require,module,exports){
var Canvas, Engine, Frames, Graphic, Inputs, Rectangle, Ship, Sound;

Canvas = require('./objects/Canvas');

Sound = require('./objects/Sound');

Rectangle = require('./objects/Rectangle');

Graphic = require('./objects/Graphic');

Inputs = require('./objects/Inputs');

Frames = require('./objects/Frames');

Ship = require('../spaceBlaster/objects/Ship');

Engine = (function() {
  Engine.prototype.audioPath = 'audio/';

  Engine.prototype.height = 675;

  Engine.prototype.imagePath = 'images/';

  Engine.prototype.width = 1200;

  function Engine(options) {
    this.reset();
  }

  Engine.prototype.play = function() {
    return this.frames.play();
  };

  Engine.prototype.pause = function() {
    return this.frames.pause();
  };

  Engine.prototype.reset = function() {};

  Engine.prototype.reset = function() {
    var frames, input, ship, stage;
    stage = new Canvas(1200, 675, 'canvas-wrapper');
    frames = new Frames();
    input = new Inputs({
      32: {
        name: 'spacebar'
      },
      37: {
        name: 'left'
      },
      39: {
        name: 'right'
      }
    });
    ship = new Ship({
      ctx: stage.ctx,
      frames: frames
    });
    frames.update = function() {
      stage.clear();
      return ship.draw();
    };
    input.on({
      spacebar: ship.fire,
      left: ship.moveLeft,
      right: ship.moveRight
    });
    return frames.play();
  };

  return Engine;

})();

module.exports = Engine;


},{"../spaceBlaster/objects/Ship":10,"./objects/Canvas":3,"./objects/Frames":5,"./objects/Graphic":6,"./objects/Inputs":7,"./objects/Rectangle":8,"./objects/Sound":9}],3:[function(require,module,exports){
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
    this.ctx.width = this.el.width = this.width;
    return this.ctx.height = this.el.height = this.height;
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
var Inputs,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Inputs = (function() {
  function Inputs(keys) {
    this.keys = keys;
    this.keyup = __bind(this.keyup, this);
    this.keydown = __bind(this.keydown, this);
    this.pressed = {};
    this.events = {};
    window.addEventListener("keyup", this.keyup);
    window.addEventListener("keydown", this.keydown);
  }

  Inputs.prototype.on = function(events, callback) {
    var event, _results;
    if (typeof this.events === 'object') {
      _results = [];
      for (event in events) {
        _results.push(this.events[event] = events[event]);
      }
      return _results;
    } else if (typeof this.events === 'string') {
      return this.events[event] = callback;
    }
  };

  Inputs.prototype.trigger = function(fullEvent) {
    var baseEvent, childEvent, segments, _base, _base1;
    segments = fullEvent.split(':');
    baseEvent = segments[0];
    childEvent = segments[1];
    if (typeof (_base = this.events)[fullEvent] === "function") {
      _base[fullEvent]();
    }
    if (childEvent) {
      return typeof (_base1 = this.events)[baseEvent] === "function" ? _base1[baseEvent](childEvent) : void 0;
    }
  };

  Inputs.prototype.keydown = function(event) {
    var code, input;
    code = event.keyCode;
    input = this.keys[code];
    if (input && input.state !== 'down') {
      event.preventDefault();
      input.state = 'down';
      return this.trigger("" + input.name + ":down");
    }
  };

  Inputs.prototype.keyup = function(event) {
    var code, input;
    code = event.keyCode;
    input = this.keys[code];
    if (input) {
      input.state = 'up';
      return this.trigger("" + input.name + ":up");
    }
  };

  return Inputs;

})();

module.exports = Inputs;


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


},{}],10:[function(require,module,exports){
var DisplayObject, Graphic, Ship, Sound,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DisplayObject = require('../../blastEngine/objects/DisplayObject');

Graphic = require('../../blastEngine/objects/Graphic');

Sound = require('../../blastEngine/objects/Sound');

Ship = (function(_super) {
  __extends(Ship, _super);

  function Ship(properties) {
    this.fire = __bind(this.fire, this);
    this.moveRight = __bind(this.moveRight, this);
    this.moveLeft = __bind(this.moveLeft, this);
    this.extendWith(properties);
    this.setDefaults();
  }

  Ship.prototype.setDefaults = function() {
    this.fireButtonReleased = true;
    this.image = new Graphic(this.ctx, "build/images/ship.png");
    this.missiles = [];
    this.now = 0;
    this.then = 0;
    this.rotation = 0;
    this.scale = 1;
    this.vx = 0;
    this.height = 160;
    this.width = 160;
    this.x = this.ctx.width / 2 - this.width / 2;
    this.y = this.ctx.height - this.height - 25;
    this.laserSound = new Sound("build/audio/laser");
    this.explodeSound = new Sound("build/audio/explode");
    this.thrust = {
      left: 0,
      right: 0
    };
    this.speed = this.speed || 300;
    this.maxMissiles = this.maxMissiles || 3;
    return this.repeatRate = this.repeatRate || 30;
  };

  Ship.prototype.moveLeft = function(state) {
    if (state === 'down') {
      this.thrust.left = this.speed * this.frames.delta;
      return this.vx -= this.thrust.left;
    } else if (state === 'up') {
      return this.vx += this.thrust.left;
    }
  };

  Ship.prototype.moveRight = function(state) {
    if (state === 'down') {
      this.thrust.right = this.speed * this.frames.delta;
      return this.vx += this.thrust.right;
    } else if (state === 'up') {
      return this.vx -= this.thrust.right;
    }
  };

  Ship.prototype.loadMissiles = function() {};

  Ship.prototype.fire = function(state) {
    console.log(state);
    if (state === 'down') {
      console.log('fire!');
      return this.laserSound.play();
    }
  };

  Ship.prototype.drawType = function() {
    return this.image.draw();
  };

  Ship.prototype.die = function() {
    return this.explodeSound.play();
  };

  return Ship;

})(DisplayObject);

module.exports = Ship;


},{"../../blastEngine/objects/DisplayObject":4,"../../blastEngine/objects/Graphic":6,"../../blastEngine/objects/Sound":9}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvbWFpbi5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9DYW52YXMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL29iamVjdHMvRGlzcGxheU9iamVjdC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9GcmFtZXMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL29iamVjdHMvR3JhcGhpYy5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvYmxhc3RFbmdpbmUvb2JqZWN0cy9JbnB1dHMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL29iamVjdHMvUmVjdGFuZ2xlLmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ndWxwLXN0YXJ0ZXIvc3JjL2NvZmZlZS9ibGFzdEVuZ2luZS9vYmplY3RzL1NvdW5kLmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ndWxwLXN0YXJ0ZXIvc3JjL2NvZmZlZS9zcGFjZUJsYXN0ZXIv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RVYsRUFxRUEsTUFBSztDQUNILEdBQUEsT0FBRCxDQUFhO0NBdEVkLEVBcUVLOztDQXJFTDs7Q0FEa0I7O0FBeUVuQixDQTdFQSxFQTZFaUIsQ0E3RWpCLEVBNkVNLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkJsYXN0RW5naW5lID0gcmVxdWlyZSAnLi9ibGFzdEVuZ2luZS9tYWluJ1xuZW5naW5lID0gbmV3IEJsYXN0RW5naW5lKCkiLCJDYW52YXMgPSByZXF1aXJlICcuL29iamVjdHMvQ2FudmFzJ1xuU291bmQgPSByZXF1aXJlICcuL29iamVjdHMvU291bmQnXG5SZWN0YW5nbGUgPSByZXF1aXJlICcuL29iamVjdHMvUmVjdGFuZ2xlJ1xuR3JhcGhpYyA9IHJlcXVpcmUgJy4vb2JqZWN0cy9HcmFwaGljJ1xuSW5wdXRzID0gcmVxdWlyZSAnLi9vYmplY3RzL0lucHV0cydcbkZyYW1lcyA9IHJlcXVpcmUgJy4vb2JqZWN0cy9GcmFtZXMnXG5TaGlwID0gcmVxdWlyZSAnLi4vc3BhY2VCbGFzdGVyL29iamVjdHMvU2hpcCdcblxuY2xhc3MgRW5naW5lXG5cdGF1ZGlvUGF0aDogJ2F1ZGlvLycsXG5cdGhlaWdodDogNjc1LFxuXHRpbWFnZVBhdGg6ICdpbWFnZXMvJyxcblx0d2lkdGg6IDEyMDAsXG5cblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdEByZXNldCgpXG5cblx0cGxheTogLT4gQGZyYW1lcy5wbGF5KClcblxuXHRwYXVzZTogLT4gQGZyYW1lcy5wYXVzZSgpXG5cblx0cmVzZXQ6IC0+ICMgcmVzZXQgdmFsdWVzXG5cblx0cmVzZXQ6IC0+XG5cdFx0c3RhZ2UgPSAgbmV3IENhbnZhcyAxMjAwLCA2NzUsICdjYW52YXMtd3JhcHBlcidcblx0XHRmcmFtZXMgPSBuZXcgRnJhbWVzKClcblx0XHRpbnB1dCA9IG5ldyBJbnB1dHNcblx0XHRcdDMyOiB7IG5hbWU6ICdzcGFjZWJhcicgfVxuXHRcdFx0Mzc6IHsgbmFtZTogJ2xlZnQnIH1cblx0XHRcdDM5OiB7IG5hbWU6ICdyaWdodCcgfVxuXG5cdFx0c2hpcCA9IG5ldyBTaGlwXG5cdFx0XHRjdHg6IHN0YWdlLmN0eFxuXHRcdFx0ZnJhbWVzOiBmcmFtZXNcblxuXHRcdGZyYW1lcy51cGRhdGUgPSAtPlxuXHRcdFx0c3RhZ2UuY2xlYXIoKVxuXHRcdFx0c2hpcC5kcmF3KClcblxuXHRcdGlucHV0Lm9uXG5cdFx0XHRzcGFjZWJhcjogc2hpcC5maXJlXG5cdFx0XHRsZWZ0OiBzaGlwLm1vdmVMZWZ0XG5cdFx0XHRyaWdodDogc2hpcC5tb3ZlUmlnaHRcblxuXHRcdGZyYW1lcy5wbGF5KClcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZSIsImNsYXNzIENhbnZhc1xuXHRjb25zdHJ1Y3RvcjogKEB3aWR0aCwgQGhlaWdodCwgQGlkKSAtPlxuXHRcdEBjcmVhdGUoKVxuXHRcdEBhcHBlbmQoKVxuXG5cdGFwcGVuZDogLT5cblx0XHRlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoQGlkKSBvciBkb2N1bWVudC5ib2R5XG5cdFx0ZWxlbWVudC5hcHBlbmRDaGlsZChAZWwpXG5cblx0Y2xlYXI6IChkaW1lbnNpb25zKSAtPlxuXHRcdHggPSAwXG5cdFx0eSA9IDBcblx0XHR3aWR0aCA9IEB3aWR0aFxuXHRcdGhlaWdodCA9IEBoZWlnaHRcblxuXHRcdGlmIGRpbWVuc2lvbnNcblx0XHRcdHggPSBkaW1lbnNpb25zLnggLSAxXG5cdFx0XHR5ID0gZGltZW5zaW9ucy55IC0gMVxuXHRcdFx0d2lkdGggPSBkaW1lbnNpb25zLndpZHRoICsgMlxuXHRcdFx0aGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQgKyAyXG5cblx0XHRAY3R4LmNsZWFyUmVjdCB4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cblx0Y3JlYXRlOiAtPlxuXHRcdEBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcblx0XHRAY3R4ID0gQGVsLmdldENvbnRleHQoXCIyZFwiKVxuXHRcdEBjdHgud2lkdGggPSBAZWwud2lkdGggPSBAd2lkdGhcblx0XHRAY3R4LmhlaWdodCA9IEBlbC5oZWlnaHQgPSBAaGVpZ2h0XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FudmFzIiwiY2xhc3MgRGlzcGxheU9iamVjdFxuXHRjb2xvcjogXCJibHVlXCJcblx0aGVpZ2h0OiAxMDBcblx0cm90YXRpb246IDBcblx0c2NhbGU6IDFcblx0d2lkdGg6IDEwMFxuXHR4OiAwXG5cdHk6IDBcblx0dng6IDBcblx0dnk6IDBcblxuXHRjb25zdHJ1Y3RvcjogKEBjdHgsIHByb3BlcnRpZXMpIC0+XG5cdFx0QHNldCBwcm9wZXJ0aWVzIGlmIHByb3BlcnRpZXNcblxuXHRleHRlbmRXaXRoOiAocHJvcGVydGllcykgLT5cblx0XHRmb3IgcHJvcGVydHkgb2YgcHJvcGVydGllc1xuXHRcdFx0dGhpc1twcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XVxuXG5cdGRyYXc6IC0+XG5cdFx0QGN0eC5zYXZlKClcblxuXHRcdCMgUm91bmQgdG8gd2hvbGUgcGl4ZWxcblx0XHR4ID0gKEB4ICs9IEB2eCkgKyAwLjUgfCAwXG5cdFx0eSA9IChAeSArPSBAdnkpICsgMC41IHwgMFxuXG5cdFx0IyBBcHBseSBUcmFuc2Zvcm1hdGlvbnMgKHNjYWxlIGFuZCByb3RhdGUgZnJvbSBjZW50ZXIpXG5cdFx0QGN0eC50cmFuc2xhdGUgeCArIEB3aWR0aCAvIDIsIHkgKyBAaGVpZ2h0IC8gMlxuXHRcdEBjdHgucm90YXRlIEByb3RhdGlvblxuXHRcdEBjdHguc2NhbGUgQHNjYWxlLCBAc2NhbGVcblx0XHRAY3R4LnRyYW5zbGF0ZSAtQHdpZHRoIC8gMiwgLUBoZWlnaHQgLyAyXG5cblx0XHQjIENhbGwgZXh0ZW5kZWQgT2JqZWN0IFR5cGUncyBkcmF3IG1ldGhvZFxuXHRcdEBkcmF3VHlwZSBhbmQgQGRyYXdUeXBlKClcblx0XHRAY3R4LnJlc3RvcmUoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BsYXlPYmplY3QiLCJjbGFzcyBGcmFtZXNcblx0Y29uc3RydWN0b3I6IC0+XG5cdFx0QGRlbHRhID0gMFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCBAcGF1c2UsIGZhbHNlXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCBAcGxheSwgZmFsc2VcblxuXHR1cGRhdGU6IC0+ICMgT3ZlcndyaXRlIHdpdGggZ2FtZSBmaWxlXG5cblx0bG9vcDogPT5cblx0XHRAc2V0RGVsdGEoKVxuXHRcdEB1cGRhdGUoKVxuXHRcdEBhbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGxvb3BcblxuXHRwYXVzZTogPT5cblx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgQGFuaW1hdGlvbkZyYW1lXG5cdFx0QGlzUGxheWluZyA9IGZhbHNlXG5cblx0cGxheTogPT5cblx0XHR1bmxlc3MgQGlzUGxheWluZ1xuXHRcdFx0QGlzUGxheWluZyA9IHRydWVcblx0XHRcdEB0aGVuID0gRGF0ZS5ub3coKVxuXHRcdFx0QGxvb3AoKVxuXG5cdHNldERlbHRhOiAtPlxuXHRcdEBub3cgPSBEYXRlLm5vdygpXG5cdFx0QGRlbHRhID0gKEBub3cgLSBAdGhlbikgLyAxMDAwICMgc2Vjb25kcyBzaW5jZSBsYXN0IGZyYW1lXG5cdFx0QHRoZW4gPSBAbm93XG5cbm1vZHVsZS5leHBvcnRzID0gRnJhbWVzIiwiRGlzcGxheU9iamVjdCA9IHJlcXVpcmUoJy4vRGlzcGxheU9iamVjdCcpXG5cbmNsYXNzIEdyYXBoaWMgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG5cdGNvbnN0cnVjdG9yOiAoQGN0eCwgQHNyYywgb3B0aW9ucykgLT5cblx0XHRAZXh0ZW5kV2l0aChvcHRpb25zKTtcblx0XHRAY3JlYXRlSW1hZ2UoKVxuXHRcdEBsb2FkKClcblxuXHRjcmVhdGVJbWFnZTogLT5cblx0XHRAaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuXHRcdEBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIEBzcmMpXG5cblx0ZHJhd1R5cGU6IC0+XG5cdFx0aWYgQHJlYWR5XG5cdFx0XHRAY3R4LmRyYXdJbWFnZSBAaW1hZ2UsIDAsIDBcblx0XHRlbHNlXG5cdFx0XHRAaW1hZ2Uub25sb2FkID0gPT5cblx0XHRcdFx0QHJlYWR5ID0gdHJ1ZVxuXHRcdFx0XHRAZHJhd1xuXG5cdGxvYWQ6IC0+XG5cdFx0QHJlYWR5ID0gZmFsc2Vcblx0XHRAaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuXHRcdEBpbWFnZS5zcmMgPSBAc3JjXG5cdFx0QGltYWdlLm9ubG9hZCA9ID0+IEByZWFkeSA9IHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljIiwiY2xhc3MgSW5wdXRzXG5cdGNvbnN0cnVjdG9yOiAoQGtleXMpIC0+XG5cdFx0QHByZXNzZWQgPSB7fVxuXHRcdEBldmVudHMgPSB7fVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwia2V5dXBcIiwgQGtleXVwXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIEBrZXlkb3duXG5cblx0b246IChldmVudHMsIGNhbGxiYWNrKSAtPlxuXHRcdGlmIHR5cGVvZiBAZXZlbnRzIGlzICdvYmplY3QnXG5cdFx0XHRmb3IgZXZlbnQgb2YgZXZlbnRzXG5cdFx0XHRcdEBldmVudHNbZXZlbnRdID0gZXZlbnRzW2V2ZW50XVxuXG5cdFx0ZWxzZSBpZiB0eXBlb2YgQGV2ZW50cyBpcyAnc3RyaW5nJ1xuXHRcdFx0QGV2ZW50c1tldmVudF0gPSBjYWxsYmFja1xuXG5cdHRyaWdnZXI6IChmdWxsRXZlbnQpIC0+XG5cdFx0c2VnbWVudHMgPSBmdWxsRXZlbnQuc3BsaXQoJzonKTtcblx0XHRiYXNlRXZlbnQgPSBzZWdtZW50c1swXVxuXHRcdGNoaWxkRXZlbnQgPSBzZWdtZW50c1sxXVxuXG5cdFx0QGV2ZW50c1tmdWxsRXZlbnRdPygpXG5cblx0XHRpZiBjaGlsZEV2ZW50XG5cdFx0XHRAZXZlbnRzW2Jhc2VFdmVudF0/KGNoaWxkRXZlbnQpXG5cblx0a2V5ZG93bjogKGV2ZW50KSA9PlxuXHRcdGNvZGUgPSBldmVudC5rZXlDb2RlXG5cdFx0aW5wdXQgPSBAa2V5c1tjb2RlXVxuXHRcdGlmIGlucHV0IGFuZCBpbnB1dC5zdGF0ZSBpc250ICdkb3duJ1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRcdFx0aW5wdXQuc3RhdGUgPSAnZG93bidcblx0XHRcdEB0cmlnZ2VyKFwiI3tpbnB1dC5uYW1lfTpkb3duXCIpXG5cblx0a2V5dXA6IChldmVudCkgPT5cblx0XHRjb2RlID0gZXZlbnQua2V5Q29kZVxuXHRcdGlucHV0ID0gQGtleXNbY29kZV1cblx0XHRpZiBpbnB1dFxuXHRcdFx0aW5wdXQuc3RhdGUgPSAndXAnXG5cdFx0XHRAdHJpZ2dlcihcIiN7aW5wdXQubmFtZX06dXBcIilcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dHMiLCJEaXNwbGF5T2JqZWN0ID0gcmVxdWlyZSgnLi9EaXNwbGF5T2JqZWN0JylcblxuY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgRGlzcGxheU9iamVjdFxuICBjb25zdHJ1Y3RvcjogKGN0eCwgcHJvcGVydGllcykgLT5cbiAgICBzdXBlciBjdHgsIHByb3BlcnRpZXNcblxuICBkcmF3VHlwZTogLT5cbiAgICBAY3R4LmZpbGxTdHlsZSA9IEBjb2xvclxuICAgIEBjdHguZmlsbFJlY3QgMCwgMCwgQHdpZHRoLCBAaGVpZ2h0XG4gICAgQGN0eC5maWxsKClcblxubW9kdWxlLmV4cG9ydHMgPSBSZWN0YW5nbGUiLCJjbGFzcyBTb3VuZFxuXHRmaWxlVHlwZXM6IFtcIm9nZ1wiLCBcIm1wM1wiXVxuXG5cdGNvbnN0cnVjdG9yOiAoQHNyYywgbG9vcHMpIC0+XG5cdFx0QGlzRW5hYmxlZCA9IHRydWVcblx0XHRAY3JlYXRlQXVkaW9FbGVtZW50IGxvb3BzXG5cdFx0QGZpbGVUeXBlcy5mb3JFYWNoIEBhZGRTb3VyY2Vcblx0XHRub3QgbG9vcHMgJiBAY2hhbmdlUGxheVN0YXRlT25FbmRlZCgpXG5cblx0YWRkU291cmNlOiAoZXh0ZW50aW9uKSA9PlxuXHRcdHNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIilcblx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBcIiN7QHNyY30uI3tleHRlbnRpb259XCIpXG5cdFx0c291cmNlLnNldEF0dHJpYnV0ZSAndHlwZScsIFwiYXVkaW8vI3tleHRlbnRpb259XCJcblx0XHRAYXVkaW8uYXBwZW5kQ2hpbGQgc291cmNlXG5cblx0Y3JlYXRlQXVkaW9FbGVtZW50OiAobG9vcHMpIC0+XG5cdFx0QGF1ZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpXG5cdFx0QGF1ZGlvLnByZWxvYWQgPSBcImF1dG9cIlxuXHRcdEBhdWRpby5sb29wID0gISFsb29wc1xuXG5cdGNoYW5nZVBsYXlTdGF0ZU9uRW5kZWQ6IC0+XG5cdFx0QGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIgXCJlbmRlZFwiLCA9PlxuXHRcdFx0QGlzUGxheWluZyA9IGZhbHNlXG5cdFx0LCBmYWxzZVxuXG5cdGRpc2FibGU6IC0+XG5cdFx0QGF1ZGlvLnBhdXNlKClcblx0XHRAaXNFbmFibGVkID0gZmFsc2VcblxuXHRlbmFibGU6IC0+XG5cdFx0QGlzRW5hYmxlZCA9IHRydWVcblx0XHRAcmVzdW1lKClcblxuXHRwbGF5OiAtPlxuXHRcdGlmIEBpc0VuYWJsZWRcblx0XHRcdEBpc1BsYXlpbmcgPSB0cnVlXG5cdFx0XHRjbGVhclRpbWVvdXQgQHBsYXlUaW1lb3V0XG5cdFx0XHRpZiBAYXVkaW8ucmVhZHlTdGF0ZSA+IDFcblx0XHRcdFx0QGF1ZGlvLmN1cnJlbnRUaW1lID0gMFxuXHRcdFx0XHRAYXVkaW8ucGxheSgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBwbGF5VGltZW91dCA9IHNldFRpbWVvdXQoPT5cblx0XHRcdFx0XHRAcGxheSgpXG5cdFx0XHRcdCwgMjApXG5cblx0cGF1c2U6IC0+XG5cdFx0QGF1ZGlvLnBhdXNlKClcblx0XHRAaXNQbGF5aW5nID0gZmFsc2VcblxuXHRyZXN1bWU6IC0+XG5cdFx0QGF1ZGlvLnBsYXkoKSAgaWYgQGlzRW5hYmxlZCBhbmQgQGlzUGxheWluZ1xuXG5cdHN0b3A6IC0+XG5cdFx0aWYgQGF1ZGlvLnJlYWR5U3RhdGUgPiAxXG5cdFx0XHRAYXVkaW8ucGF1c2UoKVxuXHRcdFx0QGF1ZGlvLmN1cnJlbnRUaW1lID0gMFxuXHRcdFx0QGlzUGxheWluZyA9IGZhbHNlXG5cbm1vZHVsZS5leHBvcnRzID0gU291bmRcbiIsIkRpc3BsYXlPYmplY3QgPSByZXF1aXJlICcuLi8uLi9ibGFzdEVuZ2luZS9vYmplY3RzL0Rpc3BsYXlPYmplY3QnXG5HcmFwaGljICAgICAgID0gcmVxdWlyZSAnLi4vLi4vYmxhc3RFbmdpbmUvb2JqZWN0cy9HcmFwaGljJ1xuU291bmQgICAgICAgICA9IHJlcXVpcmUgJy4uLy4uL2JsYXN0RW5naW5lL29iamVjdHMvU291bmQnXG5cbmNsYXNzIFNoaXAgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG5cdGNvbnN0cnVjdG9yOiAocHJvcGVydGllcykgLT5cblx0XHRAZXh0ZW5kV2l0aCBwcm9wZXJ0aWVzXG5cdFx0QHNldERlZmF1bHRzKClcblx0XHQjIEBsb2FkTWlzc2lsZXMoKVxuXG5cdHNldERlZmF1bHRzOiAtPlxuXHRcdEBmaXJlQnV0dG9uUmVsZWFzZWQgPSB0cnVlXG5cdFx0QGltYWdlID0gbmV3IEdyYXBoaWMoQGN0eCwgXCJidWlsZC9pbWFnZXMvc2hpcC5wbmdcIilcblx0XHRAbWlzc2lsZXMgPSBbXVxuXHRcdEBub3cgPSAwXG5cdFx0QHRoZW4gPSAwXG5cdFx0QHJvdGF0aW9uID0gMCAjIHJhZGlhbnNcblx0XHRAc2NhbGUgPSAxXG5cdFx0QHZ4ID0gMFxuXHRcdEBoZWlnaHQgPSAxNjBcblx0XHRAd2lkdGggPSAxNjBcblx0XHRAeCA9IEBjdHgud2lkdGggLyAyIC0gQHdpZHRoIC8gMlxuXHRcdEB5ID0gQGN0eC5oZWlnaHQgLSBAaGVpZ2h0IC0gMjVcblx0XHRAbGFzZXJTb3VuZCA9IG5ldyBTb3VuZChcImJ1aWxkL2F1ZGlvL2xhc2VyXCIpXG5cdFx0QGV4cGxvZGVTb3VuZCA9IG5ldyBTb3VuZChcImJ1aWxkL2F1ZGlvL2V4cGxvZGVcIilcblx0XHRAdGhydXN0ID1cblx0XHRcdGxlZnQ6IDBcblx0XHRcdHJpZ2h0OiAwXG5cdFx0IyBVc2VyIGRlZmluZWFibGUgc2V0dGluZ3Ncblx0XHRAc3BlZWQgPSBAc3BlZWQgb3IgMzAwXG5cdFx0QG1heE1pc3NpbGVzID0gQG1heE1pc3NpbGVzIG9yIDNcblx0XHRAcmVwZWF0UmF0ZSA9IEByZXBlYXRSYXRlIG9yIDMwXG5cblx0bW92ZUxlZnQ6IChzdGF0ZSkgPT5cblx0XHRpZiBzdGF0ZSBpcyAnZG93bidcblx0XHRcdEB0aHJ1c3QubGVmdCA9IEBzcGVlZCAqIEBmcmFtZXMuZGVsdGFcblx0XHRcdEB2eCAtPSBAdGhydXN0LmxlZnRcblx0XHRlbHNlIGlmIHN0YXRlIGlzICd1cCdcblx0XHRcdEB2eCArPSBAdGhydXN0LmxlZnRcblxuXHRtb3ZlUmlnaHQ6IChzdGF0ZSkgPT5cblx0XHRpZiBzdGF0ZSBpcyAnZG93bidcblx0XHRcdEB0aHJ1c3QucmlnaHQgPSBAc3BlZWQgKiBAZnJhbWVzLmRlbHRhXG5cdFx0XHRAdnggKz0gQHRocnVzdC5yaWdodFxuXHRcdGVsc2UgaWYgc3RhdGUgaXMgJ3VwJ1xuXHRcdFx0QHZ4IC09IEB0aHJ1c3QucmlnaHRcblxuXHRsb2FkTWlzc2lsZXM6IC0+XG5cdFx0IyBpID0gMFxuXHRcdCMgd2hpbGUgaSA8IEBtYXhNaXNzaWxlc1xuXHRcdCMgXHRAbWlzc2lsZXMucHVzaCBuZXcgU3BhY2VCbGFzdGVyLk1pc3NpbGUodGhpcylcblx0XHQjIFx0aSsrXG5cblx0ZmlyZTogKHN0YXRlKSA9PlxuXHRcdGNvbnNvbGUubG9nIHN0YXRlXG5cdFx0aWYgc3RhdGUgaXMgJ2Rvd24nXG5cdFx0XHRjb25zb2xlLmxvZyAnZmlyZSEnXG5cdFx0XHRAbGFzZXJTb3VuZC5wbGF5KClcblxuXHRcdCMgQGZpcmVCdXR0b25SZWxlYXNlZCA9IHRydWVcblx0XHQjIEBub3cgPSBAZnJhbWVzLm5vd1xuXHRcdCMgZmlyZURlbHRhID0gKEBub3cgLSBAdGhlbikgLyAxMDAwXG5cdFx0IyBtaXNzaWxlc0xvYWRlZCA9IEBtaXNzaWxlcy5sZW5ndGggPiAwXG5cdFx0IyBndW5Jc0Nvb2wgPSBmaXJlRGVsdGEgPiAxIC8gQHJlcGVhdFJhdGVcblx0XHQjIHJlYWR5VG9GaXJlID0gZ3VuSXNDb29sIGFuZCBtaXNzaWxlc0xvYWRlZCBhbmQgQGZpcmVCdXR0b25SZWxlYXNlZFxuXHRcdCMgaWYgcmVhZHlUb0ZpcmVcblx0XHQjIFx0QGxhc2VyU291bmQucGxheSgpXG5cdFx0IyBcdEBmaXJlQnV0dG9uUmVsZWFzZWQgPSBmYWxzZVxuXHRcdCMgXHRAbWlzc2lsZXNbMF0uZmlyZSgpXG5cdFx0IyBcdEB0aGVuID0gQG5vd1xuXG5cdGRyYXdUeXBlOiAtPlxuXHRcdEBpbWFnZS5kcmF3KClcblxuXHRkaWU6IC0+XG5cdFx0QGV4cGxvZGVTb3VuZC5wbGF5KClcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwIl19
