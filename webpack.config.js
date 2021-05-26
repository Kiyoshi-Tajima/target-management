// CSSを別ファイルで書き出したい(必要であれば。。。)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// manifest
const { WebpackManifestPlugin } = require('webpack-manifest-plugin'); 

const path = require('path');
const src = path.resolve(__dirname, "app/frontend");
// const src = path.resolve(__dirname, "app/frontend/components");
const dist = path.resolve(__dirname, "app/templates/dist");

module.exports = {
  entry: ['@babel/polyfill', src + '/App.js'],
  // entry: ['@babel/polyfill', src + '/item.tsx'],
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
      // {
      //   test: /\.(ts|tsx)$/,
      //   use: [
      //     {
      //       loader: 'thread-loader',
      //       options: {
      //         workers: require('os').cpus().length - 1
      //       }
      //     },
      //     {
      //       loader: 'ts-loader',
      //       options: {
      //         transpileOnly: true,
      //         happyPackMode: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
              ['@babel/preset-env', {"targets": {"node": true}}], // async:await対応
              ["@babel/preset-typescript"]
            ]
          }
        }]
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
    watchContentBase: true,
    contentBase: path.join(__dirname, 'app/templates'),
    publicPath: '/dist/',
    open: true,
    overlay: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  plugins: [
    // manifestファイルは現在不要なのでコメントアウト
    // new WebpackManifestPlugin({
    //   writeToFileEmit: true
    // }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
  ],
}
// sourceMap(思いので一旦コメントアウト)
// if (process.env.NODE_ENV !== 'production') {
//   module.exports.devtool = 'inline-source-map';
// }

