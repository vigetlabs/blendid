global.GULP_CONFIG = require('./gulpfile.js/lib/get-config')()

var karmaWebpack  = require('karma-webpack')
var webpackConfig = require('./gulpfile.js/lib/webpack-multi-config')
var path          = require('path')

var testSrc = path.resolve(process.env.PWD, GULP_CONFIG.root.src, GULP_CONFIG.tasks.js.src, '**/__tests__/*')

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
