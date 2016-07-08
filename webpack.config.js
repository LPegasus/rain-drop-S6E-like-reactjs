
var path = require('path');
var webpack = require('webpack');
var config = {
  entry: path.join(__dirname, "./main.js"),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },

  devServer: {
    inline: true,
    port: 7777
  },
  devtool: "#cheap-source-map",

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
        extensions: ['json'],
        test: /\.(json)(\?.*)?$/,
        loader: 'json-loader'
      },
      {
        extensions: ['coffee'],
        test: /\.(coffee)(\?.*)?$/,
        loader: 'coffee-redux-loader'
      },
      {
        extensions: ['json5'],
        test: /\.(json5)(\?.*)?$/,
        loader: 'json5-loader'
      },
      {
        extensions: ['txt'],
        test: /\.(txt)(\?.*)?$/,
        loader: 'raw-loader'
      },
      {
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=10000'
      },
      {
        extensions: ['woff', 'woff2'],
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        extensions: ['ttf', 'eot'],
        test: /\.(ttf|eot)(\?.*)?$/,
        loader: 'file-loader'
      },
      {
        extensions: ['wav', 'mp3'],
        test: /\.(wav|mp3)(\?.*)?$/,
        loader: 'file-loader'
      },
      {
        extensions: ['html'],
        test: /\.(html)(\?.*)?$/,
        loader: 'html-loader'
      },
      {
        extensions: ['md', 'markdown'],
        test: /\.(md|markdown)(\?.*)?$/,
        loaders: ['html-loader', 'markdown-loader']
      },
      {
        extensions: ['css'],
        test: /\.(css)(\?.*)?$/,
        loader: 'style-loader!css-loader?module&localIdentName=[path][name]---[local]---[hash:base64:5]'
      },
      {
        extensions: ['less'],
        test: /\.(less)(\?.*)?$/,
        loader: 'style-loader!css-loader?module&localIdentName=[path][name]---[local]---[hash:base64:5]!less-loader'
      },
      {
        extensions: ['styl'],
        test: /\.(styl)(\?.*)?$/,
        loader: 'style-loader!css-loader?module&localIdentName=[path][name]---[local]---[hash:base64:5]!stylus-loader'
      },
      {
        extensions: ['scss', 'sass'],
        test: /\.(scss|sass)(\?.*)?$/,
        loader: 'style-loader!css-loader?module&localIdentName=[path][name]---[local]---[hash:base64:5]!sass-loader'
      }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve('rd'),
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      /**
       * 在这里引入 manifest 文件
       */
      manifest: require('./dist/react-manifest.json')
    })
  ]
}

module.exports = config;