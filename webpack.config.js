import * as path from 'path';
//import * as webpack from 'webpack';
//import * as HtmlWebPackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

const dirname = path.dirname('.');

export default {
  target: 'web',
  devtool: 'inline-source-map',
  entry: path.resolve(dirname, 'src/index.js'),
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(dirname, 'src/js'), path.resolve(dirname, 'node_modules')]
  },
  output: {
    path: path.resolve(dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
    ],
  },
  //plugins: [
  //  new HtmlWebPackPlugin({
  //    template: './src/index.html',
  //    filename: './index.html',
  //  }),
  //  new MiniCssExtractPlugin({
  //    filename: '[name].css',
  //    chunkFilename: '[id].css',
  //  }),
  //  new webpack.HotModuleReplacementPlugin(),
  //],
};
