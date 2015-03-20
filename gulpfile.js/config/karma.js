var config = require('./')
var karmaWebpack = require('karma-webpack')
var karmaWebpack = require('karma-webpack')
var webpackConfg = require('./webpack')
var nyan = require('karma-nyan-reporter')

module.exports = {
  frameworks: ['mocha', 'sinon-chai', 'webpack'],
  files: [
    'app/assets/javascripts/**/__tests__/*'
  ],
  preprocessors: {
    'app/assets/javascripts/**/__tests__/*': ['webpack']
  },
  webpack: webpackConfg,
  singleRun: process.env.TRAVIS_CI === 'true',
  reporters: [ 'nyan' ],
  browsers: [(process.env.TRAVIS_CI === 'true'? 'Firefox' : 'Chrome')],
  plugins: [ karmaWebpack ]
}
