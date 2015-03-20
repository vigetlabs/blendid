var config = require('./')
var karmaWebpack = require('karma-webpack')
var webpackConfg = require('./webpack')

module.exports = {
  frameworks: ['mocha', 'sinon-chai'],
  files: [
    'app/assets/javascripts/**/__tests__/*'
  ],
  preprocessors: {
    'app/assets/javascripts/**/__tests__/*': ['webpack']
  },
  webpack: webpackConfg,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: ['nyan'],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')]
}
