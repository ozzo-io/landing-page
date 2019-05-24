const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CrittersWebpackPlugin = require('critters-webpack-plugin');
//installed via npm
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    host: "0.0.0.0",
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
              'css-loader',
              'sass-loader'
              ]
          })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new ExtractTextPlugin('css/main.css'),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' }, 
      { from: 'src/browserconfig.xml', to: 'browserconfig.xml' },
      { from: 'src/site.webmanifest', to: 'site.webmanifest' },
      { from: 'src/CNAME', to: 'CNAME', toType: 'file'}
    ]),
    new CrittersWebpackPlugin({
      preload: 'swap',
      preloadFonts: true
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
