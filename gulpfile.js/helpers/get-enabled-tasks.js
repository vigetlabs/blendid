const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

// Grouped by what can run in parallel
let assetTasks = ['fonts', 'iconFont', 'images', 'svgSprite'];
let codeTasks = ['html', 'stylesheets', 'javascripts'];

module.exports = function (env) {

  console.log('waaa');

  console.log(findExistingTasks(assetTasks));

  function findExistingTasks(candidates) {

    let tasks = compact(candidates.map(matchFilter).filter(this.exists));

    return isEmpty(tasks) ? false : tasks;
  }

  function matchFilter(task) {

    if (global.TASK_CONFIG[task]) {

      // @todo - Ensure we prepare javascript differently for production
      // if (task === 'javascripts') {
      //   task = env === 'production' ? 'webpack:production' : false;
      // }

      return task;
    }
  }

  function exists(value) {
    return value !== false;
  }

  return {
    assetTasks: findExistingTasks(assetTasks),
    codeTasks: findExistingTasks(codeTasks)
  };
};