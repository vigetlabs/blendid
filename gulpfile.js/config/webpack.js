var config = require('./')
var webpack = require('webpack')

module.exports = {
  entry: {
      global: config.sourceAssets + '/javascripts/global.js',
      page: config.sourceAssets + '/javascripts/page.js'
  },
  output: {
      path: config.publicAssets + '/javascripts',
      filename: "[name].js",
      publicPath: "assets/javascripts/"
  },
  minChunks: 2,
  async: true,
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "shared",
        filename: "shared.js",
        minChunks: 2,
        chunks: ["global", "page"]
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
