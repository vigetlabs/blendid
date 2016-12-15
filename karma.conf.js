global.PATH_CONFIG = require('./gulpfile.js/lib/get-path-config')
global.TASK_CONFIG = require('./gulpfile.js/lib/get-task-config')

var karmaWebpack  = require('karma-webpack')
var webpackConfig = require('./gulpfile.js/lib/webpack-multi-config')
var path          = require('path')

var testSrc = path.join(path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.javascripts.src), TASK_CONFIG.javascripts.testPattern || '**/*.test.js')

var karmaConfig = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [ testSrc ],
  preprocessors: {},
  webpack: webpackConfig('test'),
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
}

karmaConfig.preprocessors[testSrc] = ['webpack']

module.exports = function(config) {
  config.set(karmaConfig)
}
