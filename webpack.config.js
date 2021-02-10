// こいつがなかったら始まらない
const webpack = require('webpack');  
// CSSを別ファイルで書き出したい
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

module.exports = {
  entry: src + '/app.js',
  output: {
    path: dist,
    filename: "bundle.js",
  },
  module: {
    rules: [
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
            presets: ['@babel/preset-react', '@babel/preset-env']
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
    historyApiFallback: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
  ],
}
