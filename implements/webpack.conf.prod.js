const path = require('path');
const webpack = require('webpack');

// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const context = process.cwd();

module.exports = {
  mode: 'production',
	entry: {
    'client': [
		  path.join(src, 'app.jsx'),
	  ],
	},

  output: {
    path: assetsPath,
    filename: '[name].js?v=[chunkhash]',
    chunkFilename: '[name].js?v=[chunkhash]',
    publicPath: '/',
  },

	plugins:[
    // optimizations
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new UglifyJsPlugin(),

    //Analization
    new BundleAnalyzerPlugin({
    	analyzerMode: 'static',
    	reportFilename: path.join(context, 'reports/report.html'),
    	generateStatsFile: true,
      openAnalyzer: false,
    	statsFilename: path.join(context, 'reports/stats.json'),
    })
	],
}
