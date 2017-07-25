const webpack = require('webpack');

module.exports = {
  entry: './client/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "eslint-loader",
        query: {
          configFile: './.eslintrc'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
         test: /\.css$/, 
         use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
