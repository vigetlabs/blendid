(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BlastEngine, engine;

BlastEngine = require('./spaceBlaster/game');

engine = new BlastEngine();


},{"./spaceBlaster/game":10}],2:[function(require,module,exports){
var Canvas;

Canvas = (function() {
  function Canvas(_arg) {
    this.height = _arg.height, this.width = _arg.width, this.id = _arg.id;
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


},{}],3:[function(require,module,exports){
/*
Controller.coffee
-----------
Instantiates a game controller containing access to
inputs, frames, the stage, and scene methods
*/

var Canvas, Controller, Frames, Inputs;

Canvas = require('./Canvas');

Inputs = require('./Inputs');

Frames = require('./Frames');

Controller = (function() {
  function Controller(options) {
    this.frames = new Frames();
    this.stage = new Canvas(options.stage);
    this.inputs = new Inputs(options.inputs);
  }

  return Controller;

})();

module.exports = Controller;


},{"./Canvas":2,"./Frames":5,"./Inputs":7}],4:[function(require,module,exports){
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
    console.log('create graphic with context');
    console.log(this.ctx);
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


},{}],9:[function(require,module,exports){
var Controller;

Controller = require('./blastEngine/objects/Controller');

module.exports = new Controller({
  stage: {
    height: 675,
    width: 1200,
    id: 'canvas-wrapper'
  },
  inputs: {
    32: {
      name: 'spacebar'
    },
    37: {
      name: 'left'
    },
    39: {
      name: 'right'
    }
  }
});


},{"./blastEngine/objects/Controller":3}],10:[function(require,module,exports){
var Game, Ship, controller, frames, inputs, stage;

Ship = require('./objects/Ship');

controller = require('./controller');

frames = controller.frames;

stage = controller.stage;

inputs = controller.inputs;

Game = (function() {
  function Game() {
    var ship;
    ship = new Ship({
      ctx: stage.ctx,
      frames: frames
    });
    frames.update = function() {
      stage.clear();
      return ship.draw();
    };
    inputs.on({
      spacebar: ship.fire,
      left: ship.moveLeft,
      right: ship.moveRight
    });
    frames.play();
  }

  return Game;

})();

module.exports = Game;


},{"./controller":9,"./objects/Ship":11}],11:[function(require,module,exports){
var DisplayObject, Graphic, Ship, Sound, stage,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DisplayObject = require('../blastEngine/objects/DisplayObject');

Graphic = require('../blastEngine/objects/Graphic');

Sound = require('../blastEngine/objects/Sound');

stage = require('../controller').stage;

Ship = (function(_super) {
  __extends(Ship, _super);

  function Ship(properties) {
    this.fire = __bind(this.fire, this);
    this.moveRight = __bind(this.moveRight, this);
    this.moveLeft = __bind(this.moveLeft, this);
    this.extendWith(properties);
    this.setDefaults();
    console.log('ship created');
  }

  Ship.prototype.setDefaults = function() {
    this.fireButtonReleased = true;
    this.image = new Graphic(stage.ctx, "/build/images/ship.png");
    this.missiles = [];
    this.now = 0;
    this.then = 0;
    this.rotation = 0;
    this.scale = 1;
    this.vx = 0;
    this.height = 160;
    this.width = 160;
    this.x = stage.width / 2 - this.width / 2;
    this.y = stage.height - this.height - 25;
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
      this.vx -= this.thrust.left;
      return console.log('move left');
    } else if (state === 'up') {
      return this.vx += this.thrust.left;
    }
  };

  Ship.prototype.moveRight = function(state) {
    if (state === 'down') {
      this.thrust.right = this.speed * this.frames.delta;
      this.vx += this.thrust.right;
      return console.log('move right');
    } else if (state === 'up') {
      return this.vx -= this.thrust.right;
    }
  };

  Ship.prototype.loadMissiles = function() {
    var i, _results;
    i = 0;
    _results = [];
    while (i < this.maxMissiles) {
      this.missiles.push(new Missile(this));
      _results.push(i++);
    }
    return _results;
  };

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


},{"../blastEngine/objects/DisplayObject":4,"../blastEngine/objects/Graphic":6,"../blastEngine/objects/Sound":8,"../controller":9}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2FwcC5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvc3BhY2VCbGFzdGVyL2JsYXN0RW5naW5lL29iamVjdHMvQ2FudmFzLmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ndWxwLXN0YXJ0ZXIvc3JjL2NvZmZlZS9zcGFjZUJsYXN0ZXIvYmxhc3RFbmdpbmUvb2JqZWN0cy9Db250cm9sbGVyLmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ndWxwLXN0YXJ0ZXIvc3JjL2NvZmZlZS9zcGFjZUJsYXN0ZXIvYmxhc3RFbmdpbmUvb2JqZWN0cy9EaXNwbGF5T2JqZWN0LmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ndWxwLXN0YXJ0ZXIvc3JjL2NvZmZlZS9zcGFjZUJsYXN0ZXIvYmxhc3RFbmdpbmUvb2JqZWN0cy9GcmFtZXMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL3NwYWNlQmxhc3Rlci9ibGFzdEVuZ2luZS9vYmplY3RzL0dyYXBoaWMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL3NwYWNlQmxhc3Rlci9ibGFzdEVuZ2luZS9vYmplY3RzL0lucHV0cy5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvc3BhY2VCbGFzdGVyL2JsYXN0RW5naW5lL29iamVjdHMvU291bmQuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL3NwYWNlQmxhc3Rlci9jb250cm9sbGVyLmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ndWxwLXN0YXJ0ZXIvc3JjL2NvZmZlZS9zcGFjZUJsYXN0ZXIvZ2FtZS5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvc3BhY2VCbGFzdGVyL29iamVjdHMvU2hpcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLGVBQUE7O0FBQUEsQ0FBQSxFQUFjLElBQUEsSUFBZCxVQUFjOztBQUNkLENBREEsRUFDYSxDQUFBLEVBQWIsS0FBYTs7OztBQ0RiLElBQUEsRUFBQTs7QUFBTSxDQUFOO0NBQ2MsQ0FBQSxDQUFBLENBQUE7Q0FDWixDQUR3QixFQUFUO0NBQ2YsR0FBQSxFQUFBO0NBQUEsR0FDQSxFQUFBO0NBRkQsRUFBYTs7Q0FBYixFQUlRLEdBQVIsR0FBUTtDQUNQLE1BQUEsQ0FBQTtDQUFBLENBQVUsQ0FBQSxDQUFWLEdBQUEsQ0FBa0IsTUFBUjtDQUNGLENBQVIsRUFBcUIsR0FBZCxJQUFQO0NBTkQsRUFJUTs7Q0FKUixFQVFPLEVBQVAsSUFBUSxDQUFEO0NBQ04sT0FBQSxXQUFBO0NBQUEsRUFBSSxDQUFKO0NBQUEsRUFDSSxDQUFKO0NBREEsRUFFUSxDQUFSLENBQUE7Q0FGQSxFQUdTLENBQVQsRUFBQTtDQUVBLEdBQUEsTUFBQTtDQUNDLEVBQUksR0FBSixJQUFjO0NBQWQsRUFDSSxHQUFKLElBQWM7Q0FEZCxFQUVRLEVBQVIsQ0FBQSxJQUFrQjtDQUZsQixFQUdTLEdBQVQsSUFBbUI7TUFUcEI7Q0FXQyxDQUFpQixDQUFkLENBQUgsQ0FBRCxDQUFBLEdBQUEsRUFBQTtDQXBCRCxFQVFPOztDQVJQLEVBc0JRLEdBQVIsR0FBUTtDQUNQLENBQUEsQ0FBTSxDQUFOLElBQWMsS0FBUjtDQUFOLENBQ1UsQ0FBVixDQUFBLE1BQU87Q0FEUCxDQUVnQixDQUFaLENBQUosQ0FBQTtDQUNDLENBQWdCLENB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QUFOLENBQU0sSUFBQztDQUNOLEVBQUEsQ0FBQSxDQUFBLEVBQU87Q0FDUCxHQUFBLENBQUcsQ0FBSDtDQUNDLEVBQUEsR0FBQSxDQUFPO0NBQ04sR0FBQSxNQUFVLEdBQVg7TUFKSTtDQW5ETixFQW1ETTs7Q0FuRE4sRUFxRVUsS0FBVixDQUFVO0NBQ1IsR0FBQSxDQUFLLE1BQU47Q0F0RUQsRUFxRVU7O0NBckVWLEVBd0VBLE1BQUs7Q0FDSCxHQUFBLE9BQUQsQ0FBYTtDQXpFZCxFQXdFSzs7Q0F4RUw7O0NBRGtCOztBQTRFbkIsQ0FqRkEsRUFpRmlCLENBakZqQixFQWlGTSxDQUFOIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJCbGFzdEVuZ2luZSA9IHJlcXVpcmUgJy4vc3BhY2VCbGFzdGVyL2dhbWUnXG5lbmdpbmUgPSBuZXcgQmxhc3RFbmdpbmUoKSIsImNsYXNzIENhbnZhc1xuXHRjb25zdHJ1Y3RvcjogKHsgQGhlaWdodCwgQHdpZHRoLCBAaWQgfSkgLT5cblx0XHRAY3JlYXRlKClcblx0XHRAYXBwZW5kKClcblxuXHRhcHBlbmQ6IC0+XG5cdFx0ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEBpZCkgb3IgZG9jdW1lbnQuYm9keVxuXHRcdGVsZW1lbnQuYXBwZW5kQ2hpbGQoQGVsKVxuXG5cdGNsZWFyOiAoZGltZW5zaW9ucykgLT5cblx0XHR4ID0gMFxuXHRcdHkgPSAwXG5cdFx0d2lkdGggPSBAd2lkdGhcblx0XHRoZWlnaHQgPSBAaGVpZ2h0XG5cblx0XHRpZiBkaW1lbnNpb25zXG5cdFx0XHR4ID0gZGltZW5zaW9ucy54IC0gMVxuXHRcdFx0eSA9IGRpbWVuc2lvbnMueSAtIDFcblx0XHRcdHdpZHRoID0gZGltZW5zaW9ucy53aWR0aCArIDJcblx0XHRcdGhlaWdodCA9IGRpbWVuc2lvbnMuaGVpZ2h0ICsgMlxuXG5cdFx0QGN0eC5jbGVhclJlY3QgeCwgeSwgd2lkdGgsIGhlaWdodFxuXG5cdGNyZWF0ZTogLT5cblx0XHRAZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXG5cdFx0QGN0eCA9IEBlbC5nZXRDb250ZXh0KFwiMmRcIilcblx0XHRAY3R4LndpZHRoID0gQGVsLndpZHRoID0gQHdpZHRoXG5cdFx0QGN0eC5oZWlnaHQgPSBAZWwuaGVpZ2h0ID0gQGhlaWdodFxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbnZhcyIsIiMjI1xuQ29udHJvbGxlci5jb2ZmZWVcbi0tLS0tLS0tLS0tXG5JbnN0YW50aWF0ZXMgYSBnYW1lIGNvbnRyb2xsZXIgY29udGFpbmluZyBhY2Nlc3MgdG9cbmlucHV0cywgZnJhbWVzLCB0aGUgc3RhZ2UsIGFuZCBzY2VuZSBtZXRob2RzXG4jIyNcblxuQ2FudmFzICAgID0gcmVxdWlyZSAnLi9DYW52YXMnXG5JbnB1dHMgICAgPSByZXF1aXJlICcuL0lucHV0cydcbkZyYW1lcyAgICA9IHJlcXVpcmUgJy4vRnJhbWVzJ1xuXG5jbGFzcyBDb250cm9sbGVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucykgLT5cblx0XHRAZnJhbWVzID0gbmV3IEZyYW1lcygpXG5cdFx0QHN0YWdlID0gIG5ldyBDYW52YXMgb3B0aW9ucy5zdGFnZVxuXHRcdEBpbnB1dHMgPSBuZXcgSW5wdXRzIG9wdGlvbnMuaW5wdXRzXG5cblxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sbGVyIiwiY2xhc3MgRGlzcGxheU9iamVjdFxuXHRjb2xvcjogXCJibHVlXCJcblx0aGVpZ2h0OiAxMDBcblx0cm90YXRpb246IDBcblx0c2NhbGU6IDFcblx0d2lkdGg6IDEwMFxuXHR4OiAwXG5cdHk6IDBcblx0dng6IDBcblx0dnk6IDBcblxuXHRjb25zdHJ1Y3RvcjogKEBjdHgsIHByb3BlcnRpZXMpIC0+XG5cdFx0QHNldCBwcm9wZXJ0aWVzIGlmIHByb3BlcnRpZXNcblxuXHRleHRlbmRXaXRoOiAocHJvcGVydGllcykgLT5cblx0XHRmb3IgcHJvcGVydHkgb2YgcHJvcGVydGllc1xuXHRcdFx0dGhpc1twcm9wZXJ0eV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5XVxuXG5cdGRyYXc6IC0+XG5cdFx0QGN0eC5zYXZlKClcblxuXHRcdCMgUm91bmQgdG8gd2hvbGUgcGl4ZWxcblx0XHR4ID0gKEB4ICs9IEB2eCkgKyAwLjUgfCAwXG5cdFx0eSA9IChAeSArPSBAdnkpICsgMC41IHwgMFxuXG5cdFx0IyBBcHBseSBUcmFuc2Zvcm1hdGlvbnMgKHNjYWxlIGFuZCByb3RhdGUgZnJvbSBjZW50ZXIpXG5cdFx0QGN0eC50cmFuc2xhdGUgeCArIEB3aWR0aCAvIDIsIHkgKyBAaGVpZ2h0IC8gMlxuXHRcdEBjdHgucm90YXRlIEByb3RhdGlvblxuXHRcdEBjdHguc2NhbGUgQHNjYWxlLCBAc2NhbGVcblx0XHRAY3R4LnRyYW5zbGF0ZSAtQHdpZHRoIC8gMiwgLUBoZWlnaHQgLyAyXG5cblx0XHQjIENhbGwgZXh0ZW5kZWQgT2JqZWN0IFR5cGUncyBkcmF3IG1ldGhvZFxuXHRcdEBkcmF3VHlwZSBhbmQgQGRyYXdUeXBlKClcblx0XHRAY3R4LnJlc3RvcmUoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BsYXlPYmplY3QiLCJjbGFzcyBGcmFtZXNcblx0Y29uc3RydWN0b3I6IC0+XG5cdFx0QGRlbHRhID0gMFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCBAcGF1c2UsIGZhbHNlXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJmb2N1c1wiLCBAcGxheSwgZmFsc2VcblxuXHR1cGRhdGU6IC0+ICMgT3ZlcndyaXRlIHdpdGggZ2FtZSBmaWxlXG5cblx0bG9vcDogPT5cblx0XHRAc2V0RGVsdGEoKVxuXHRcdEB1cGRhdGUoKVxuXHRcdEBhbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGxvb3BcblxuXHRwYXVzZTogPT5cblx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgQGFuaW1hdGlvbkZyYW1lXG5cdFx0QGlzUGxheWluZyA9IGZhbHNlXG5cblx0cGxheTogPT5cblx0XHR1bmxlc3MgQGlzUGxheWluZ1xuXHRcdFx0QGlzUGxheWluZyA9IHRydWVcblx0XHRcdEB0aGVuID0gRGF0ZS5ub3coKVxuXHRcdFx0QGxvb3AoKVxuXG5cdHNldERlbHRhOiAtPlxuXHRcdEBub3cgPSBEYXRlLm5vdygpXG5cdFx0QGRlbHRhID0gKEBub3cgLSBAdGhlbikgLyAxMDAwICMgc2Vjb25kcyBzaW5jZSBsYXN0IGZyYW1lXG5cdFx0QHRoZW4gPSBAbm93XG5cbm1vZHVsZS5leHBvcnRzID0gRnJhbWVzIiwiRGlzcGxheU9iamVjdCA9IHJlcXVpcmUoJy4vRGlzcGxheU9iamVjdCcpXG5cbmNsYXNzIEdyYXBoaWMgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG5cdGNvbnN0cnVjdG9yOiAoQGN0eCwgQHNyYywgb3B0aW9ucykgLT5cblx0XHRjb25zb2xlLmxvZyAnY3JlYXRlIGdyYXBoaWMgd2l0aCBjb250ZXh0J1xuXHRcdGNvbnNvbGUubG9nIEBjdHhcblx0XHRAZXh0ZW5kV2l0aChvcHRpb25zKTtcblx0XHRAY3JlYXRlSW1hZ2UoKVxuXHRcdEBsb2FkKClcblxuXHRjcmVhdGVJbWFnZTogLT5cblx0XHRAaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuXHRcdEBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIEBzcmMpXG5cblx0ZHJhd1R5cGU6IC0+XG5cdFx0aWYgQHJlYWR5XG5cdFx0XHRAY3R4LmRyYXdJbWFnZSBAaW1hZ2UsIDAsIDBcblx0XHRlbHNlXG5cdFx0XHRAaW1hZ2Uub25sb2FkID0gPT5cblx0XHRcdFx0QHJlYWR5ID0gdHJ1ZVxuXHRcdFx0XHRAZHJhd1xuXG5cdGxvYWQ6IC0+XG5cdFx0QHJlYWR5ID0gZmFsc2Vcblx0XHRAaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuXHRcdEBpbWFnZS5zcmMgPSBAc3JjXG5cdFx0QGltYWdlLm9ubG9hZCA9ID0+IEByZWFkeSA9IHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljIiwiY2xhc3MgSW5wdXRzXG5cdGNvbnN0cnVjdG9yOiAoQGtleXMpIC0+XG5cdFx0QHByZXNzZWQgPSB7fVxuXHRcdEBldmVudHMgPSB7fVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwia2V5dXBcIiwgQGtleXVwXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIEBrZXlkb3duXG5cblx0b246IChldmVudHMsIGNhbGxiYWNrKSAtPlxuXHRcdGlmIHR5cGVvZiBAZXZlbnRzIGlzICdvYmplY3QnXG5cdFx0XHRmb3IgZXZlbnQgb2YgZXZlbnRzXG5cdFx0XHRcdEBldmVudHNbZXZlbnRdID0gZXZlbnRzW2V2ZW50XVxuXG5cdFx0ZWxzZSBpZiB0eXBlb2YgQGV2ZW50cyBpcyAnc3RyaW5nJ1xuXHRcdFx0QGV2ZW50c1tldmVudF0gPSBjYWxsYmFja1xuXG5cdHRyaWdnZXI6IChmdWxsRXZlbnQpIC0+XG5cdFx0c2VnbWVudHMgPSBmdWxsRXZlbnQuc3BsaXQoJzonKTtcblx0XHRiYXNlRXZlbnQgPSBzZWdtZW50c1swXVxuXHRcdGNoaWxkRXZlbnQgPSBzZWdtZW50c1sxXVxuXG5cdFx0QGV2ZW50c1tmdWxsRXZlbnRdPygpXG5cblx0XHRpZiBjaGlsZEV2ZW50XG5cdFx0XHRAZXZlbnRzW2Jhc2VFdmVudF0/KGNoaWxkRXZlbnQpXG5cblx0a2V5ZG93bjogKGV2ZW50KSA9PlxuXHRcdGNvZGUgPSBldmVudC5rZXlDb2RlXG5cdFx0aW5wdXQgPSBAa2V5c1tjb2RlXVxuXHRcdGlmIGlucHV0IGFuZCBpbnB1dC5zdGF0ZSBpc250ICdkb3duJ1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXHRcdFx0aW5wdXQuc3RhdGUgPSAnZG93bidcblx0XHRcdEB0cmlnZ2VyKFwiI3tpbnB1dC5uYW1lfTpkb3duXCIpXG5cblx0a2V5dXA6IChldmVudCkgPT5cblx0XHRjb2RlID0gZXZlbnQua2V5Q29kZVxuXHRcdGlucHV0ID0gQGtleXNbY29kZV1cblx0XHRpZiBpbnB1dFxuXHRcdFx0aW5wdXQuc3RhdGUgPSAndXAnXG5cdFx0XHRAdHJpZ2dlcihcIiN7aW5wdXQubmFtZX06dXBcIilcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dHMiLCJjbGFzcyBTb3VuZFxuXHRmaWxlVHlwZXM6IFtcIm9nZ1wiLCBcIm1wM1wiXVxuXG5cdGNvbnN0cnVjdG9yOiAoQHNyYywgbG9vcHMpIC0+XG5cdFx0QGlzRW5hYmxlZCA9IHRydWVcblx0XHRAY3JlYXRlQXVkaW9FbGVtZW50IGxvb3BzXG5cdFx0QGZpbGVUeXBlcy5mb3JFYWNoIEBhZGRTb3VyY2Vcblx0XHRub3QgbG9vcHMgJiBAY2hhbmdlUGxheVN0YXRlT25FbmRlZCgpXG5cblx0YWRkU291cmNlOiAoZXh0ZW50aW9uKSA9PlxuXHRcdHNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIilcblx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBcIiN7QHNyY30uI3tleHRlbnRpb259XCIpXG5cdFx0c291cmNlLnNldEF0dHJpYnV0ZSAndHlwZScsIFwiYXVkaW8vI3tleHRlbnRpb259XCJcblx0XHRAYXVkaW8uYXBwZW5kQ2hpbGQgc291cmNlXG5cblx0Y3JlYXRlQXVkaW9FbGVtZW50OiAobG9vcHMpIC0+XG5cdFx0QGF1ZGlvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpXG5cdFx0QGF1ZGlvLnByZWxvYWQgPSBcImF1dG9cIlxuXHRcdEBhdWRpby5sb29wID0gISFsb29wc1xuXG5cdGNoYW5nZVBsYXlTdGF0ZU9uRW5kZWQ6IC0+XG5cdFx0QGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIgXCJlbmRlZFwiLCA9PlxuXHRcdFx0QGlzUGxheWluZyA9IGZhbHNlXG5cdFx0LCBmYWxzZVxuXG5cdGRpc2FibGU6IC0+XG5cdFx0QGF1ZGlvLnBhdXNlKClcblx0XHRAaXNFbmFibGVkID0gZmFsc2VcblxuXHRlbmFibGU6IC0+XG5cdFx0QGlzRW5hYmxlZCA9IHRydWVcblx0XHRAcmVzdW1lKClcblxuXHRwbGF5OiAtPlxuXHRcdGlmIEBpc0VuYWJsZWRcblx0XHRcdEBpc1BsYXlpbmcgPSB0cnVlXG5cdFx0XHRjbGVhclRpbWVvdXQgQHBsYXlUaW1lb3V0XG5cdFx0XHRpZiBAYXVkaW8ucmVhZHlTdGF0ZSA+IDFcblx0XHRcdFx0QGF1ZGlvLmN1cnJlbnRUaW1lID0gMFxuXHRcdFx0XHRAYXVkaW8ucGxheSgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBwbGF5VGltZW91dCA9IHNldFRpbWVvdXQoPT5cblx0XHRcdFx0XHRAcGxheSgpXG5cdFx0XHRcdCwgMjApXG5cblx0cGF1c2U6IC0+XG5cdFx0QGF1ZGlvLnBhdXNlKClcblx0XHRAaXNQbGF5aW5nID0gZmFsc2VcblxuXHRyZXN1bWU6IC0+XG5cdFx0QGF1ZGlvLnBsYXkoKSAgaWYgQGlzRW5hYmxlZCBhbmQgQGlzUGxheWluZ1xuXG5cdHN0b3A6IC0+XG5cdFx0aWYgQGF1ZGlvLnJlYWR5U3RhdGUgPiAxXG5cdFx0XHRAYXVkaW8ucGF1c2UoKVxuXHRcdFx0QGF1ZGlvLmN1cnJlbnRUaW1lID0gMFxuXHRcdFx0QGlzUGxheWluZyA9IGZhbHNlXG5cbm1vZHVsZS5leHBvcnRzID0gU291bmRcbiIsIkNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2JsYXN0RW5naW5lL29iamVjdHMvQ29udHJvbGxlcicpXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IENvbnRyb2xsZXJcblx0c3RhZ2U6XG5cdFx0aGVpZ2h0OiA2NzVcblx0XHR3aWR0aDogMTIwMFxuXHRcdGlkOiAnY2FudmFzLXdyYXBwZXInXG5cblx0aW5wdXRzOlxuXHRcdDMyOiB7IG5hbWU6ICdzcGFjZWJhcicgfVxuXHRcdDM3OiB7IG5hbWU6ICdsZWZ0JyB9XG5cdFx0Mzk6IHsgbmFtZTogJ3JpZ2h0JyB9XG4iLCJTaGlwID0gcmVxdWlyZSgnLi9vYmplY3RzL1NoaXAnKVxuY29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29udHJvbGxlcicpXG5mcmFtZXMgPSBjb250cm9sbGVyLmZyYW1lc1xuc3RhZ2UgPSBjb250cm9sbGVyLnN0YWdlXG5pbnB1dHMgPSBjb250cm9sbGVyLmlucHV0c1xuXG5jbGFzcyBHYW1lXG5cdGNvbnN0cnVjdG9yOiAtPlxuXHRcdHNoaXAgPSBuZXcgU2hpcFxuXHRcdFx0Y3R4OiBzdGFnZS5jdHhcblx0XHRcdGZyYW1lczogZnJhbWVzXG5cblx0XHRmcmFtZXMudXBkYXRlID0gLT5cblx0XHRcdHN0YWdlLmNsZWFyKClcblx0XHRcdHNoaXAuZHJhdygpXG5cblx0XHRpbnB1dHMub25cblx0XHRcdHNwYWNlYmFyOiBzaGlwLmZpcmVcblx0XHRcdGxlZnQ6IHNoaXAubW92ZUxlZnRcblx0XHRcdHJpZ2h0OiBzaGlwLm1vdmVSaWdodFxuXG5cdFx0ZnJhbWVzLnBsYXkoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWUiLCJEaXNwbGF5T2JqZWN0ID0gcmVxdWlyZSAnLi4vYmxhc3RFbmdpbmUvb2JqZWN0cy9EaXNwbGF5T2JqZWN0J1xuR3JhcGhpYyAgICAgICA9IHJlcXVpcmUgJy4uL2JsYXN0RW5naW5lL29iamVjdHMvR3JhcGhpYydcblNvdW5kICAgICAgICAgPSByZXF1aXJlICcuLi9ibGFzdEVuZ2luZS9vYmplY3RzL1NvdW5kJ1xuc3RhZ2UgPSByZXF1aXJlKCcuLi9jb250cm9sbGVyJykuc3RhZ2VcblxuY2xhc3MgU2hpcCBleHRlbmRzIERpc3BsYXlPYmplY3Rcblx0Y29uc3RydWN0b3I6IChwcm9wZXJ0aWVzKSAtPlxuXHRcdEBleHRlbmRXaXRoIHByb3BlcnRpZXNcblx0XHRAc2V0RGVmYXVsdHMoKVxuXHRcdGNvbnNvbGUubG9nICdzaGlwIGNyZWF0ZWQnXG5cdFx0IyBAbG9hZE1pc3NpbGVzKClcblxuXHRzZXREZWZhdWx0czogLT5cblx0XHRAZmlyZUJ1dHRvblJlbGVhc2VkID0gdHJ1ZVxuXHRcdEBpbWFnZSA9IG5ldyBHcmFwaGljKHN0YWdlLmN0eCwgXCIvYnVpbGQvaW1hZ2VzL3NoaXAucG5nXCIpXG5cdFx0QG1pc3NpbGVzID0gW11cblx0XHRAbm93ID0gMFxuXHRcdEB0aGVuID0gMFxuXHRcdEByb3RhdGlvbiA9IDAgIyByYWRpYW5zXG5cdFx0QHNjYWxlID0gMVxuXHRcdEB2eCA9IDBcblx0XHRAaGVpZ2h0ID0gMTYwXG5cdFx0QHdpZHRoID0gMTYwXG5cdFx0QHggPSBzdGFnZS53aWR0aCAvIDIgLSBAd2lkdGggLyAyXG5cdFx0QHkgPSBzdGFnZS5oZWlnaHQgLSBAaGVpZ2h0IC0gMjVcblx0XHRAbGFzZXJTb3VuZCA9IG5ldyBTb3VuZChcImJ1aWxkL2F1ZGlvL2xhc2VyXCIpXG5cdFx0QGV4cGxvZGVTb3VuZCA9IG5ldyBTb3VuZChcImJ1aWxkL2F1ZGlvL2V4cGxvZGVcIilcblx0XHRAdGhydXN0ID1cblx0XHRcdGxlZnQ6IDBcblx0XHRcdHJpZ2h0OiAwXG5cdFx0IyBVc2VyIGRlZmluZWFibGUgc2V0dGluZ3Ncblx0XHRAc3BlZWQgPSBAc3BlZWQgb3IgMzAwXG5cdFx0QG1heE1pc3NpbGVzID0gQG1heE1pc3NpbGVzIG9yIDNcblx0XHRAcmVwZWF0UmF0ZSA9IEByZXBlYXRSYXRlIG9yIDMwXG5cblx0bW92ZUxlZnQ6IChzdGF0ZSkgPT5cblx0XHRpZiBzdGF0ZSBpcyAnZG93bidcblx0XHRcdEB0aHJ1c3QubGVmdCA9IEBzcGVlZCAqIEBmcmFtZXMuZGVsdGFcblx0XHRcdEB2eCAtPSBAdGhydXN0LmxlZnRcblx0XHRcdGNvbnNvbGUubG9nICdtb3ZlIGxlZnQnXG5cdFx0ZWxzZSBpZiBzdGF0ZSBpcyAndXAnXG5cdFx0XHRAdnggKz0gQHRocnVzdC5sZWZ0XG5cblx0bW92ZVJpZ2h0OiAoc3RhdGUpID0+XG5cdFx0aWYgc3RhdGUgaXMgJ2Rvd24nXG5cdFx0XHRAdGhydXN0LnJpZ2h0ID0gQHNwZWVkICogQGZyYW1lcy5kZWx0YVxuXHRcdFx0QHZ4ICs9IEB0aHJ1c3QucmlnaHRcblx0XHRcdGNvbnNvbGUubG9nICdtb3ZlIHJpZ2h0J1xuXHRcdGVsc2UgaWYgc3RhdGUgaXMgJ3VwJ1xuXHRcdFx0QHZ4IC09IEB0aHJ1c3QucmlnaHRcblxuXHRsb2FkTWlzc2lsZXM6IC0+XG5cdFx0aSA9IDBcblx0XHR3aGlsZSBpIDwgQG1heE1pc3NpbGVzXG5cdFx0XHRAbWlzc2lsZXMucHVzaCBuZXcgTWlzc2lsZSh0aGlzKVxuXHRcdFx0aSsrXG5cblx0ZmlyZTogKHN0YXRlKSA9PlxuXHRcdGNvbnNvbGUubG9nIHN0YXRlXG5cdFx0aWYgc3RhdGUgaXMgJ2Rvd24nXG5cdFx0XHRjb25zb2xlLmxvZyAnZmlyZSEnXG5cdFx0XHRAbGFzZXJTb3VuZC5wbGF5KClcblxuXHRcdCMgQGZpcmVCdXR0b25SZWxlYXNlZCA9IHRydWVcblx0XHQjIEBub3cgPSBAZnJhbWVzLm5vd1xuXHRcdCMgZmlyZURlbHRhID0gKEBub3cgLSBAdGhlbikgLyAxMDAwXG5cdFx0IyBtaXNzaWxlc0xvYWRlZCA9IEBtaXNzaWxlcy5sZW5ndGggPiAwXG5cdFx0IyBndW5Jc0Nvb2wgPSBmaXJlRGVsdGEgPiAxIC8gQHJlcGVhdFJhdGVcblx0XHQjIHJlYWR5VG9GaXJlID0gZ3VuSXNDb29sIGFuZCBtaXNzaWxlc0xvYWRlZCBhbmQgQGZpcmVCdXR0b25SZWxlYXNlZFxuXHRcdCMgaWYgcmVhZHlUb0ZpcmVcblx0XHQjIFx0QGxhc2VyU291bmQucGxheSgpXG5cdFx0IyBcdEBmaXJlQnV0dG9uUmVsZWFzZWQgPSBmYWxzZVxuXHRcdCMgXHRAbWlzc2lsZXNbMF0uZmlyZSgpXG5cdFx0IyBcdEB0aGVuID0gQG5vd1xuXG5cdGRyYXdUeXBlOiAtPlxuXHRcdEBpbWFnZS5kcmF3KClcblxuXHRkaWU6IC0+XG5cdFx0QGV4cGxvZGVTb3VuZC5wbGF5KClcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwIl19
