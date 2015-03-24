var config = require('./')
var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

module.exports = {
  entry: {
    page1: [config.sourceAssets + '/javascripts/page1.js'],
    page2: [config.sourceAssets + '/javascripts/page2.js']
  },
  output: {
    path: config.publicAssets + '/javascripts',
    filename: process.env.NODE_ENV === 'production' ? "[name]-[hash].js" : "[name].js",
    publicPath: "assets/javascripts/"
  },
  plugins: [
    function() {
      this.plugin("done", function(stats) {
        var stats = stats.toJson()
        var chunks = stats.assetsByChunkName
        var manifest = {}
        var location = 'assets/javascripts/'
        for (var key in chunks) {
          manifest[location + key + '.js'] = location + chunks[key]
        }

        fs.writeFileSync(
          path.join(process.cwd(), 'public', 'rev-manifest.json'),
          JSON.stringify(manifest)
        );
      });
    },
    new webpack.optimize.CommonsChunkPlugin({
      name: "shared",
      filename: process.env.NODE_ENV === 'production' ? "[name]-[hash].js" : "[name].js",
    }),
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
