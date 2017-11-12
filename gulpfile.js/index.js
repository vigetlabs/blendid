// Include Core & Plugins
const shell = require('shelljs');
const gulp = require('gulp');
const requireDir = require('require-dir');
const pathConfigHelper = require('./helpers/path-config-helper');
const taskConfigHelper = require('./helpers/task-config-helper');

process.env.PWD = shell.pwd();

let taskConfig = taskConfigHelper.getTaskConfig();
global.TASK_CONFIG = taskConfigHelper.withDefaults(taskConfig);
global.PATH_CONFIG = pathConfigHelper.getPathConfig();

console.log(global.TASK_CONFIG);

// Require all tasks in gulpfile.js/tasks, including sub-folders
requireDir('./tasks', {recurse: true});

// Default Task
global.TASK_CONFIG.additionalTasks.initialize(gulp, global.PATH_CONFIG, global.TASK_CONFIG);
