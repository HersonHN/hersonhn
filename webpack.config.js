module.exports = {
  mode: 'production',
  entry: {
    earthbound: './source/assets/src/earthbound/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/source/assets/dist'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.dat$/, use: 'binary-loader' }
    ]
  }
}