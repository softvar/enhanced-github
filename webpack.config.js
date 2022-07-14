const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ZipFilesPlugin = require('webpack-zip-files-plugin');
const Dotenv = require('dotenv-webpack'); //For using env variables in React components, See Plugins below
const path = require('path');
const packageFile = require('./package.json');

const libraryName = 'extension';
const libVersion = packageFile.version;
const license = packageFile.license;
const destination = path.resolve(__dirname, 'dist');
const zipDestination = path.resolve(__dirname, 'extension');

let deps = '';
Object.keys(packageFile.dependencies).map((key, index) => {
  deps += `\n ${index + 1}. ${key} - ${packageFile.dependencies[key]}`;
});

const libraryHeaderComment = `${libraryName} - v${libVersion}\n
URL - https://github.com/turbo-src/extension\n
${license} License, Copyright turbo-src

Dependencies used - ${deps}`;

function addPlugins(argv) {
  const plugins = [];
  plugins.push(
    new Dotenv({
      systemvars: true
    })
  );
  plugins.push(
    new webpack.BannerPlugin({
      banner: libraryHeaderComment,
      entryOnly: true
    })
  );
  plugins.push(
    new CleanWebpackPlugin({
      default: [destination, path.resolve(__dirname, 'extension'), path.resolve(__dirname, 'extension.zip')]
    })
  );
  plugins.push(
    new CopyPlugin(
      [
        { from: 'options.js', to: destination },
        { from: 'modal.css', to: destination },
        { from: 'src/inject.js', to: destination },
        { from: '*html', to: destination },
        { from: 'manifest.json', to: destination },
        { from: 'icons/*.png', to: destination },
        { from: 'src/background.js', to: destination },
        { from: 'LICENSE', to: destination }
      ],
      { copyUnmodified: true }
    )
  );

  if (argv.mode === 'production') {
    plugins.push(
      new ZipFilesPlugin({
        entries: [{ src: destination, dist: '/extension' }],
        output: zipDestination,
        format: 'zip'
      })
    );
  }

  return plugins;
}

module.exports = function(_env, argv) {
  return {
    entry: {
      [libraryName]: './src/popup.js',
      inject: './src/inject.js'
    },
    mode: argv.mode,
    output: {
      path: destination,
      filename: '[name].bundle.js',
      library: libraryName
      //libraryTarget: 'global'
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules|dist/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['react-app'],
                plugins: ['@babel/plugin-syntax-jsx', 'styled-components']
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: addPlugins(argv),
    watchOptions: {
      poll: true,
      ignored: /node_modules/
    }
  };
};
