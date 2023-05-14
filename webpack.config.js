const ShebangPlugin = require('webpack-shebang-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    new ShebangPlugin(),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/scopes/'),
          to: 'scopes',
        },
        {
          from: path.resolve(__dirname, 'src/templates/'),
          to: 'templates',
        },
      ],
    }),
  ],
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
