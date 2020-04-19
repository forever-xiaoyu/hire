const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const resolvePath = dir => path.join(__dirname, '..', dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const developmentConfig = require('./webpack.dev.conf')
const { getEntry, getHtmlPlugins } = require('./plugin.html.conf')

const generateConfig = (env) => {
  let scriptLoader = [
    {
      loader: 'babel-loader'
    }
  ]

  let tsLoader = [
    {
      loader: 'ts-loader'
    }
  ]

  let cssLoader = [
    'style-loader',
    'css-loader',
    'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
    'resolve-url-loader',
    'sass-loader?sourceMap' // 使用 sass-loader 将 scss 转为 css
  ]

  let cssExtractLoader = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
    'resolve-url-loader', // sourceMap 必须为 true 才能正确解析图片相对路径
    'sass-loader?sourceMap', // 使用 sass-loader 将 scss 转为 css
  ]

  let fontLoader = [
    {
      loader: 'url-loader',
      options: {
        // name: '[name]-[hash:5].min.[ext]',
        name: '[name].min.[ext]',
        limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
        // publicPath: 'fonts/',
        outputPath: 'fonts/'
      }
    }
  ]

  let imageLoader = [
    {
      loader: 'url-loader',
      options: {
        // name: '[name]-[hash:5].min.[ext]',
        name: '[name].min.[ext]',
        limit: 50000, // size <= 50KB
        // publicPath: '/',
        outputPath: 'img/'
      }
    }
  ]

  let styleLoader =
    env === 'css'
      ? cssExtractLoader // 压缩 css 代码
      : cssLoader // 页内样式嵌入

  let plugins = [
    new HtmlWebpackPlugin({
      title: 'TS INDEX',
      filename: 'index.html',
      template: resolvePath('./src/public/index.html'),
      chunks: ['app'],
      minify: {
        collapseWhitespace: true
      }
    }),
    ...getHtmlPlugins(),
    new CleanWebpackPlugin(),
    new WebpackBar(),
  ]

  return {
    entry: {
      app: './src/index.ts',
      ...getEntry()
    },
    output: {
      publicPath: '/',
      path: resolvePath('dist'),
      // filename: 'js/[name].[hash:5].js',
      filename: 'js/[name].js',
      // chunkFilename: 'js/[name].[hash:5].js'
      chunkFilename: 'js/[name].js'
    },
    resolve: {
      alias: {
        "@": resolvePath('src'),
      },
      extensions: [ '.ts', '.js' ]
    },
    module: {
      rules: [
        { test: /\.(sa|sc|c)ss$/, use: styleLoader },
        { test: /\.ts$/, exclude: /(node_modules)/, use: tsLoader },
        { test: /\.js$/, exclude: /(node_modules)/, use: scriptLoader },
        { test: /\.(eot|woff2?|ttf|svg)$/, use: fontLoader },
        { test: /\.(png|jpg|jpeg|gif)$/, use: imageLoader },
      ]
    },
    plugins
  }
}

module.exports = env => {
  let config = developmentConfig
  return merge(generateConfig(env), config)
}
