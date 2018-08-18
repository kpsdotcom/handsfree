// Modules
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Directories
const dirNode = 'node_modules'
const dirSandbox = path.join(__dirname, 'sandbox')
const dirAssets = path.join(__dirname, 'assets')
const dirSrc = path.join(__dirname, 'src')

// Settings
const IS_DEV = (process.env.NODE_ENV === 'dev')
const appHtmlTitle = 'Handsfree.js'

/**
 * Webpack Configuration
 */
module.exports = {
  // Entry scripts
  entry: {
    handsfree: ['idempotent-babel-polyfill', './src/Handsfree.js'],
    sandbox: './sandbox/index.js'
  },

  // Path resolvers
  resolve: {
    modules: [
      dirNode,
      dirSrc,
      dirSandbox,
      dirAssets
    ]
  },

  plugins: [
    new webpack.DefinePlugin({IS_DEV}),

    new HtmlWebpackPlugin({
      template: 'pug-loader!sandbox/index.pug',
      title: appHtmlTitle
    }),

    new CopyWebpackPlugin([
      {from: 'assets', to: 'assets'}
    ])
  ],

  module: {
    rules: [
      /**
       * Babel
       */
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {compact: 'auto'}
      },

      /**
       * Vanilla CSS
       */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {sourceMap: IS_DEV}
          }
        ]
      },

      /**
       * CSS Preprocessors
       */
      {
        test: /\.styl/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {sourceMap: IS_DEV}
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirAssets]
            }
          }
        ]
      },

      /**
       * Images
       */
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /(node_modules)/,
        loader: 'file-loader',
        options: {name: '[path][name].[ext]'}
      }
    ]
  }
}
