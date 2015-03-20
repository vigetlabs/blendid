var config = require('./')
var webpack = require('webpack')

module.exports = {
  entry: {
    page1: [config.sourceAssets + '/javascripts/page1.js'],
    page2: [config.sourceAssets + '/javascripts/page2.js']
  },
  output: {
    path: config.publicAssets + '/javascripts',
    filename: "[name].js",
    publicPath: "assets/javascripts/"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      filename: "shared.js"
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?experimental',
        exclude: /node_modules/
      }
    ]
  }
}
