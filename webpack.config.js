var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

var sMap = '';
if (process.env.NODE_ENV !== 'production') {
	sMap = '?sourceMap';
}

var config = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader'+sMap, 'postcss-loader'+sMap, 'sass-loader'+sMap]}
		]		
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [new HtmlWebpackPlugin({
		template: 'app/index.html'
	})]
};


if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		})
		// new webpack.optimize.UglifyJsPlugin()
	);
}

module.exports = config;