const webpack = require('webpack');
const path = require('path');

const host = process.env.HOST || 'localhost';
const port = (+process.env.PORT) || 3000;

module.exports = {
  mode: 'development',
	devtool: 'eval-source-map',
	entry: {
    'client': [
      'react-hot-loader/patch',
	  	'webpack-hot-middleware/client',
		  path.join(src, 'app.js'),
	  ],
	},

  output: {
		path: assetsPath,
		filename: '[name].js',
		publicPath: '/',
	},

	plugins: [
    new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
}
