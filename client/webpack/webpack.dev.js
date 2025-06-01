const webpack = require('webpack')
const dotenv = require('dotenv')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

dotenv.config()

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      logging: 'info',
      overlay: true,
    },
  },

  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
}
