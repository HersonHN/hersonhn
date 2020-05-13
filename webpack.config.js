const SRC = './source/assets/src';

module.exports = {
  mode: 'production',

  entry: {
    earthbound: `${SRC}/earthbound/index.js`,
    global: `${SRC}/global/index.js`
  },

  output: {
    filename: '[name].js',
    path: __dirname + '/source/assets/dist'
  },

  module: {
    rules: [
      { test: /\.dat$/, use: 'binary-loader' },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },
    ],
  },

  watch: true,
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}

