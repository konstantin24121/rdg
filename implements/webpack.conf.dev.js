const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
	devtool: 'eval-source-map',
	entry: {
    'client': [
      'react-hot-loader/patch',
	  	'webpack-hot-middleware/client',
		  path.join(src, 'app.jsx'),
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
