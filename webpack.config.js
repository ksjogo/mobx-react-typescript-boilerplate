var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
      loaders: [
          {
              test: /\.json$/,
              loader: 'json-loader'
          }
          ,{
              test: /\.tsx?$/,
              use: [
                  {
                      loader: "awesome-typescript-loader"
                  },
              ],
              include: path.join(__dirname, 'src')
          },
          {
              test: /\.css$/,
              loaders: ['style-loader', 'css-loader'],
          },
          {
              test: /\.(woff2?|ttf|eot|jpe?g|png|gif|svg)$/,
              loader: 'url-loader?limit=1'
          }
      ]
  }
};
