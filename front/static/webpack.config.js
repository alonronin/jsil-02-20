const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  plugins: [
    new HtmlPlugin({
      title: 'JS-IL 02-2020',
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    })
  ]
};
