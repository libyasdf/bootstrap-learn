const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require("./config");
const webpack = require('webpack');
const IS_DEV = process.env.NODE_ENV === "development";

let HTMLPlugins = [];
config.HTMLDirs.forEach(page => {
  const htmlPlugin = new HtmlWebPackPlugin({
    filename: `${page}.html`,
    template: `./src/page/${page}.html`, //path.resolve(__dirname, )
    favicon: path.resolve(__dirname, "./src/public/images/jinding.png"), //在网页窗口栏上加上图标
    minify: !IS_DEV && {
      collapseWhitespace: true, //清楚空格、换行符
      preserveLineBreaks: true, //保留换行符
      removeComments: true //清理html中的注释
    }
  });
  HTMLPlugins.push(htmlPlugin);
  // Entries[page] = path.resolve(__dirname, `./src/js/${page}.js`);
});


module.exports = {
  entry: path.join(__dirname, './src/index.js'), //入口,要使用webpack打包那个文件。
  output: { //输出文件的配置
    path: path.join(__dirname, './dist'), //指定到那个目录中去
    // filename: "index.bundle.js", //指定输出文件的名称
    filename: IS_DEV ? "[name].[hash:8].js" : "[name].[chunkhash:8].js", //后者需要注释掉plugins中的HotModuleReplacementPlugin
    // publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, './src'), //本地服务器所加载的页面所在的目录
    hot: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, {
      test: /\.html$/,
      use: [{
        loader: "html-loader",
        options: {
          minimize: true
        }
      }]
    }, {
      test: /\.scss$/,
      use: [
        // "style-loader",
        IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader, //如果是开发模式使用内嵌样式
        "css-loader",
        "sass-loader"
      ]
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[name].[ext]",
          fallback: "file-loader", //超过了限制大小调用回调函数
          outputPath: "public/images" //图片存储的地址
        }
      }]
    }]
  },
  plugins: [...HTMLPlugins,
    // new HtmlWebPackPlugin({
    //   template: "./src/page/index.html",
    //   filename: "./index.html"
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: !IS_DEV ? "./css/[name].[contenthash:8].css" : "[name].css",
      chunkFilename: !IS_DEV ? "./css/[name].[contenthash:8].css" : "[name].css",
      allChunks: true
    }),
    new CleanWebpackPlugin() //在构建之前清理dist文件
  ]
};
