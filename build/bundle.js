(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BlastEngine, Canvas;

Canvas = require('./canvas');

BlastEngine = (function() {
  function BlastEngine() {
    console.log('blast engine loaded');
    this.canvas = new Canvas(300, 300);
    this.canvas.ctx.fillText('I am blast engine', 0, 0);
  }

  BlastEngine.prototype.test = function() {
    return console.log('test');
  };

  return BlastEngine;

})();

module.exports = BlastEngine;


},{"./canvas":2}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
var BlastEngine, engine;

BlastEngine = require('./blastEngine/blastEngine');

engine = new BlastEngine();

engine.test();


},{"./blastEngine/blastEngine":1}]},{},[3])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2JsYXN0RW5naW5lL2JsYXN0RW5naW5lLmNvZmZlZSIsIi9Vc2Vycy9ncmV5cGFudHMvQ29kZS9ndWxwLXN0YXJ0ZXIvc3JjL2NvZmZlZS9ibGFzdEVuZ2luZS9jYW52YXMuY29mZmVlIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxlQUFBOztBQUFBLENBQUEsRUFBUyxHQUFULENBQVMsR0FBQTs7QUFFSCxDQUZOO0NBR2MsQ0FBQSxDQUFBLGtCQUFBO0NBQ1osRUFBQSxDQUFBLEdBQU8sY0FBUDtDQUFBLENBQzBCLENBQVosQ0FBZCxFQUFBO0NBREEsQ0FFMEMsQ0FBL0IsQ0FBWCxFQUFPLEVBQVAsV0FBQTtDQUhELEVBQWE7O0NBQWIsRUFLTSxDQUFOLEtBQU07Q0FDRyxFQUFSLEdBQUEsQ0FBTyxJQUFQO0NBTkQsRUFLTTs7Q0FMTjs7Q0FIRDs7QUFXQSxDQVhBLEVBV2lCLEdBQVgsQ0FBTixJQVhBOzs7O0FDQUEsSUFBQSxFQUFBOztBQUFNLENBQU47Q0FDZSxDQUFBLENBQUEsRUFBQSxDQUFBLFVBQUU7Q0FDYixFQURhLENBQUQsQ0FDWjtDQUFBLEVBRHFCLENBQUQsRUFDcEI7Q0FBQSxDQUFBLENBRDhCLENBQUQ7Q0FDN0IsR0FBQSxFQUFBO0NBQUEsR0FDQSxFQUFBO0NBRkYsRUFBYTs7Q0FBYixFQUlRLEdBQVIsR0FBUTtDQUNQLE1BQUEsQ0FBQTtDQUFBLENBQVUsQ0FBQSxDQUFWLEdBQUEsQ0FBa0IsTUFBUjtDQUNGLENBQVIsRUFBcUIsR0FBZCxJQUFQO0NBTkQsRUFJUTs7Q0FKUixFQVFPLEVBQVAsSUFBUSxDQUFEO0NBQ0wsT0FBQSxXQUFBO0NBQUEsRUFBSSxDQUFKO0NBQUEsRUFDSSxDQUFKO0NBREEsRUFFUSxDQUFSLENBQUE7Q0FGQSxFQUdTLENBQVQsRUFBQTtDQUVBLEdBQUEsTUFBQTtDQUNFLEVBQUksR0FBSixJQUFjO0NBQWQsRUFDSSxHQUFKLElBQWM7Q0FEZCxFQUVRLEVBQVIsQ0FBQSxJQUFrQjtDQUZsQixFQUdTLEdBQVQsSUFBbUI7TUFUckI7Q0FXQyxDQUFpQixDQUFkLENBQUgsQ0FBRCxDQUFBLEdBQUEsRUFBQTtDQXBCRixFQVFPOztDQVJQLEVBc0JRLEdBQVIsR0FBUTtDQUNOLENBQUEsQ0FBTSxDQUFOLElBQWMsS0FBUjtDQUFOLENBQ1UsQ0FBVixDQUFBLE1BQU87Q0FEUCxDQUVHLENBQVMsQ0FBWixDQUFBO0NBQ0MsQ0FBRSxDQUFVLENBQVosRUFBRCxLQUFBO0NBMUJGLEVBc0JROztDQXRCUjs7Q0FERjs7QUE2QkEsQ0E3QkEsRUE2QmlCLEdBQVgsQ0FBTjs7OztBQzdCQSxJQUFBLGVBQUE7O0FBQUEsQ0FBQSxFQUFjLElBQUEsSUFBZCxnQkFBYzs7QUFFZCxDQUZBLEVBRWEsQ0FBQSxFQUFiLEtBQWE7O0FBQ2IsQ0FIQSxHQUdBLEVBQU0iLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkNhbnZhcyA9IHJlcXVpcmUgJy4vY2FudmFzJ1xuXG5jbGFzcyBCbGFzdEVuZ2luZVxuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRjb25zb2xlLmxvZyAnYmxhc3QgZW5naW5lIGxvYWRlZCdcblx0XHRAY2FudmFzID0gbmV3IENhbnZhcyAzMDAsIDMwMFxuXHRcdEBjYW52YXMuY3R4LmZpbGxUZXh0KCdJIGFtIGJsYXN0IGVuZ2luZScsIDAsIDApXG5cblx0dGVzdDogLT5cblx0XHRjb25zb2xlLmxvZyAndGVzdCdcblxubW9kdWxlLmV4cG9ydHMgPSBCbGFzdEVuZ2luZSIsImNsYXNzIENhbnZhc1xuICBjb25zdHJ1Y3RvcjogKEB3aWR0aCwgQGhlaWdodCwgQGlkKSAtPlxuICAgIEBjcmVhdGUoKVxuICAgIEBhcHBlbmQoKVxuXG4gIGFwcGVuZDogLT5cbiAgXHRlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoQGlkKSBvciBkb2N1bWVudC5ib2R5XG4gIFx0ZWxlbWVudC5hcHBlbmRDaGlsZChAZWwpXG5cbiAgY2xlYXI6IChkaW1lbnNpb25zKSAtPlxuICAgIHggPSAwXG4gICAgeSA9IDBcbiAgICB3aWR0aCA9IEB3aWR0aFxuICAgIGhlaWdodCA9IEBoZWlnaHRcblxuICAgIGlmIGRpbWVuc2lvbnNcbiAgICAgIHggPSBkaW1lbnNpb25zLnggLSAxXG4gICAgICB5ID0gZGltZW5zaW9ucy55IC0gMVxuICAgICAgd2lkdGggPSBkaW1lbnNpb25zLndpZHRoICsgMlxuICAgICAgaGVpZ2h0ID0gZGltZW5zaW9ucy5oZWlnaHQgKyAyXG5cbiAgICBAY3R4LmNsZWFyUmVjdCB4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cbiAgY3JlYXRlOiAtPlxuICAgIEBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcbiAgICBAY3R4ID0gQGVsLmdldENvbnRleHQoXCIyZFwiKVxuICAgIEBlbC53aWR0aCA9IEB3aWR0aFxuICAgIEBlbC5oZWlnaHQgPSBAaGVpZ2h0XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FudmFzIiwiQmxhc3RFbmdpbmUgPSByZXF1aXJlICcuL2JsYXN0RW5naW5lL2JsYXN0RW5naW5lJ1xuXG5lbmdpbmUgPSBuZXcgQmxhc3RFbmdpbmUoKVxuZW5naW5lLnRlc3QoKSJdfQ==
