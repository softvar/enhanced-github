const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ZipFilesPlugin = require('webpack-zip-files-plugin');

const path = require('path');
const packageFile = require('./package.json');

const libraryName = 'enhanced-github';
const libVersion = packageFile.version;
const license = packageFile.license;
const destination = path.resolve(__dirname, 'dist');
const zipDestination = path.resolve(__dirname, 'enhanced-github');

let deps = '';
Object.keys(packageFile.dependencies).map((key, index) => {
  deps += `\n ${index + 1}. ${key} - ${packageFile.dependencies[key]}`;
});

const libraryHeaderComment = `${libraryName} - v${libVersion}\n
URL - https://github.com/softvar/ehanced-github\n
${license} License, Copyright Varun Malhotra

Dependencies used - ${deps}`;

const plugins = [
  new webpack.BannerPlugin({
    banner: libraryHeaderComment,
    entryOnly: true
  }),
  new CleanWebpackPlugin({
    default: [destination]
  }),
  new CopyPlugin([
    { from: 'options.js', to: destination },
    { from: 'popup.js', to: destination },
    { from: '*html', to: destination },
    { from: 'manifest.json', to: destination },
    { from: 'icons/*.png', to: destination }
  ]),
  new ZipFilesPlugin({
    entries: [
      { src: destination, dist: zipDestination }
    ],
    output: zipDestination,
    format: 'zip',
  }),
];

module.exports = function(_env, argv) {
  return {
    entry: {
      [libraryName]: './src/inject.js'
    },
    mode: argv.mode,
    output: {
      path: destination,
      filename: 'src/inject.js',
      library: libraryName,
      libraryTarget: 'global'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules|dist/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins
  };
};
