const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
// :::::::::::::::::::::::::::::::
  mode: "development",
  // mode:"production",
// :::::::::::::::::::::::::::::::
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    libraryTarget: 'var',
    library: 'Client'    // you can use any word in here .
  },
// ::::::::::::::::::::::::::::::::
  devServer: {
    static: {
      directory: path.join(__dirname, './src'),
    },
    compress: true,
    port: 3000,
  },
// :::::::::::::::::::::::::::::::
  module: { // loaders
      rules: [
        { // from sass to style 
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
        "style-loader",
          // Translates CSS into CommonJS
        "css-loader",
          // Compiles Sass to CSS
        "sass-loader",
                ],
        },
            { // babel loaders
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // file loader to load media files
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
      ],
  },
// :::::::::::::::::::::::::::::::
    plugins: [
      new HtmlWebpackPlugin({ template: './src/client/views/index.html' }),
      new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true, // dry mode 
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
            // cleanOnceBeforeBuildPatterns: ['**/*'],
            // cleanAfterEveryBuildPatterns: [],
            // dangerouslyAllowCleanPatternsOutsideProject: false,
      }),
        // please remove next comment to operate Service Worker 
        // new WorkboxPlugin.GenerateSW() 
      ]
}