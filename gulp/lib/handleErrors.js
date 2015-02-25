var notify = require("gulp-notify");

module.exports = function(errorObject) {
  notify.onError(errorObject.toString()).apply(this, arguments);
  // Keep gulp from hanging on this task
  this.emit('end');
};
