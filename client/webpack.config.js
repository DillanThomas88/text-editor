const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'jate List'
      }),
      new WorkboxPlugin.GenerateSW(),
      new WebpackPwaManifest({
        name: 'Jate - text editor',
        short_name: 'Jate',
        description: 'Keep track of important tasks!',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  }
}
