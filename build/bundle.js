(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var foo;

foo = function() {
  console.log('Check out this source map!');
  return 'Hello World.';
};

module.exports = foo;


},{}],2:[function(require,module,exports){
var foo;

foo = require('./foo');

document.body.innerText = foo();


},{"./foo":1}]},{},[2])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2dyZXlwYW50cy9Db2RlL2d1bHAtc3RhcnRlci9zcmMvY29mZmVlL2Zvby5jb2ZmZWUiLCIvVXNlcnMvZ3JleXBhbnRzL0NvZGUvZ3VscC1zdGFydGVyL3NyYy9jb2ZmZWUvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxHQUFBLENBQUE7O0FBQUEsQ0FBQSxFQUFBLE1BQU07Q0FDTCxDQUFBLENBQUEsSUFBTyxxQkFBUDtDQURLLFFBRUw7Q0FGSzs7QUFJTixDQUpBLEVBSWlCLEdBQVgsQ0FBTjs7OztBQ0pBLEdBQUEsQ0FBQTs7QUFBQSxDQUFBLEVBQUEsSUFBTTs7QUFDTixDQURBLEVBQzBCLENBQWIsSUFBTCxDQUFSIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJmb28gPSAoKSAtPlxuXHRjb25zb2xlLmxvZyAnQ2hlY2sgb3V0IHRoaXMgc291cmNlIG1hcCEnXG5cdCdIZWxsbyBXb3JsZC4nXG5cbm1vZHVsZS5leHBvcnRzID0gZm9vIiwiZm9vID0gcmVxdWlyZSAnLi9mb28nXG5kb2N1bWVudC5ib2R5LmlubmVyVGV4dCA9IGZvbygpOyJdfQ==
