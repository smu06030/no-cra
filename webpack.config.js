const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DotenvWebpack = require("dotenv-webpack");
const mode = process.env.NODE_ENV || "development";

module.exports = {
  entry: './src/app.js', // 초기 접근할 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // 루트 디렉토리에 dist 파일로 만들어줘
    filename: 'bundle.[contenthash].js', // 파일 이름은 bundle.js로 해줘
    // 캐시 버스팅 : [contenthash] 값이 바뀌게 되면 새로운 난수값을 줌 
    // 그대로면 그냥 쓰고 바뀌면 새로운 해쉬값 
  },
  module: {
    rules: [
      //.css .js 등 서로 다른 확장자를 가진 파일을 처리할 때 어떤 규칙을 적용할지 정의
      {
        test: /\.js$/, // 어떤 파일을 대상으로 할지 정규표현식으로 작성
        exclude: /node_modules/, // node_modules 폴더는 제외
        use: {
          loader: "babel-loader", // babel-loader를 사용
        },
      },
    ],
  },
  mode, 
  // production : 트리셰이킹, 코드 스플리팅, 상수 폴딩, 코드 난독화 등의 최적화 과정이 포함되어 더 오래걸림

  plugins: [
    // 빌드 시 HTML 파일 자동 업데이트
    new CleanWebpackPlugin(),
    // 파일 이름에 해시값이 추가되면 HTML 파일이 자동으로 이 파일 참조
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
    }),
    new DotenvWebpack({
      path: `./.env.${process.env.NODE_ENV || "development"}`,
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },

    port: 9000, // 개발 서버가 실행될 포트번호
    open: true, // 서버가 실행되면 자동으로 브라우저 open
    hot: true, // 코드가 변경되면 실시간 반영
  }
};