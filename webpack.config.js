// CSSを別ファイルで書き出したい(必要であれば。。。)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// manifest
const { WebpackManifestPlugin } = require('webpack-manifest-plugin'); 

const path = require('path');
const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "public/dist");

module.exports = {
  entry: ['@babel/polyfill', src + '/app.js'],
  output: {
    path: dist,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|dist)/,
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: "babel-loader",
          options: {
            plugins: [
              "react-html-attrs",
              // ES6のdecoratorsを使用する(Javaのアノテーションみたいなやつ)
              [require('@babel/plugin-proposal-decorators'), {legacy: true}]
            ],
            presets: [
              ['@babel/preset-react'], 
              ['@babel/preset-env', {"targets": {"node": true}}] // async:await対応
            ]
          }
        }]
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          { loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader},
          { loader: 'css-loader', options: {url: false}},
          { loader: 'postcss-loader', 
            options: {
              postcssOptions: {
                plugins: function () {
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            }
          },
          { loader: 'sass-loader'}
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    // host: "0.0.0.0",
    host: "localhost",
    port: "5000",
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/dist/',
    open: true,
    overlay: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  plugins: [
    new WebpackManifestPlugin({
      writeToFileEmit: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
  ],
}
// sourceMap
if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = 'inline-source-map';
}

