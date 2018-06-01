const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = process.cwd();
global.src = path.resolve(context, 'client');
global.assetsPath = path.resolve(context, 'public');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

const common = {
	context: context,

	resolve: {
		modules: [
			context,
			'node_modules',
		],
		extensions: ['.js', '.jsx', '.json'],
		alias: {
      components: path.resolve(src, 'components'),
      'redux/modules': path.resolve(src, 'redux-modules/modules'),
      utils: path.resolve(src, 'utils'),
		},
	},

	module: {
    rules: [
      {
				test: /\.jsx?(.flow)?$/,
				include: [src],
				loader: 'babel-loader',
			},
    ],
	},

	plugins: [

		new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(src, 'index.ejs'),
      appMountId: 'app',
      title: `IBIT Test ${isDevelopment ? '| DevBuild' : ''}`,
      mobile: true,
			minify: isDevelopment ? false : {
				collapseWhitespace: true,
			},
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __DEVELOPMENT__: isDevelopment,
    }),
	],
}

const developeConfig = require('./webpack.conf.dev');
const productionConfig = require('./webpack.conf.prod');

if ( isDevelopment ) {
	module.exports = merge.smart(common, developeConfig);
}else if ( isProduction ) {
	module.exports = merge.smart(common, productionConfig);
}else{
	module.exports = common;
	// throw Error(`\x1b[31m✖ ==> Our assembly have no ENV\x1b[0m like  ${process.env.NODE_ENV}`);
}
