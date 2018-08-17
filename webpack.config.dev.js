const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const pkg = require('./package.json')

module.exports = merge(webpackConfig, {
  devtool: 'inline-source-map',

  output: {
    globalObject: 'this',
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js',
    library: 'Handsfree'
  },

  devServer: {
    host: 'localhost'
  }
})
