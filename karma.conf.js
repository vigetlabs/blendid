var config = require('./gulpfile.js/config')
var karmaWebpack  = require('karma-webpack')
var webpackConfig = require('./webpack')('test')

var testSrc = config.src.root + '/' + config.src.js + '/**/__tests__/*'

var karmaConfig = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [ testSrc ],
  preprocessors: {},
  webpack: webpackConfig,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
}

karmaConfig.preprocessors[testSrc] = ['webpack']

module.exports = function(config) {
  config.set(karmaConfig)
}
