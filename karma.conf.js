var gulpConfig    = require('./gulpfile.js/config')
var karmaWebpack  = require('karma-webpack')
var webpackConfig = require('./webpack')('test')

var karmaConfig = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [ gulpConfig.testing.src ],
  preprocessors: {},
  webpack: webpackConfig,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
}

karmaConfig.preprocessors[gulpConfig.testing.src] = ['webpack']

module.exports = function(config) {
  config.set(karmaConfig)
}
