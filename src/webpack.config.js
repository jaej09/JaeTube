// webpack.config.js 에서는 이전 버전의 자바스크립트 사용해야 함.
const path = require('path'); // import path from "path" 사용 불가
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js');
const OUTPUT_DIR = path.join(__dirname, 'static');

module.exports = {
  mode    : MODE,
  entry   : [
    '@babel/polyfill',
    ENTRY_FILE
  ],
  plugins : [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename      : '[name].css',
      chunkFilename : '[id].css'
    })
  ],
  output  : {
    filename : '[name].js',
    path     : OUTPUT_DIR
  },
  module  : {
    rules : [
      {
        test : /\.js$/,
        use  : [
          'babel-loader'
        ]
      },
      {
        test : /\.scss$/,
        use  : [
          // BOTTOM TO TOP 순서
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test : /\.(png|svg|jpg|gif)$/,
        use  : [
          'file-loader'
        ]
      },
      {
        test : /\.(woff|woff2|eot|ttf|otf)$/,
        use  : [
          'file-loader'
        ]
      }
    ]
  }
};

/**
 * 1. Node 모듈에 기본적으로 포함되어 있는 Path로 Input, Output의 Path 설정
 * 2. Webpack Document 보고 Webpack 설치 및 Loader 설치
 * 3. postcss-loader 을 사용하기 위해서는, postcss-loader 설치 및 Postcss Document 참고해서 설정 
 *    -> Autoprefixer와 같은 Postcss에서 사용할 플러그인은 postcss.config.js에 설정 
 *    -> Autoprefixer의 Browserslist에 대한 설정은 .browserslistrc에 설정
 */
