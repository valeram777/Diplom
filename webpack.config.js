const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  devtool: isDev && 'source-map',
  entry: {
    index: './src/index.js',
    about: './src/about/index.js',
    analytics: './src/analytics/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        // тут описываются правила
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        loader: 'babel-loader', // весь JS обрабатывается пакетом babel-loader
        exclude: /node_modules/, // исключает папку node_modules
      },
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: true, sourceMap: true } },
          'postcss-loader',
        ],
        // к этим файлам нужно применить пакеты, которые мы уже установили
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
              limit: 100000000,
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/vendor/fonts/',
          limit: 100000000,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
    }),
    new HtmlWebpackPlugin({
      // Означает, что:
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html', // имя выходного файла, то есть того, что окажется в папке dist после сборки
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/about/index.html',
      filename: 'about/index.html',
      chunks: ['about'],
    }),
    new HtmlWebpackPlugin({
      template: './src/analytics/index.html',
      filename: 'analytics/index.html',
      chunks: ['analytics'],
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}
