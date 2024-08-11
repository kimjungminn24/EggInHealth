const path = require('path');
const webpack = require('webpack');

module.exports = {
  // 기존 설정...
  resolve: {
    alias: {
      global: path.resolve(__dirname, 'src/shims/global.js')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      global: 'window'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
};