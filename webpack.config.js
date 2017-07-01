var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PurifyCSSPlugin = require('purifycss-webpack');
var glob = require('glob');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');


var isProd = (process.env.NODE_ENV === 'production');

module.exports = {
	// entry: './assets/app.js',
	entry: {
		app: [
			'./assets/js/app.js',
			'./assets/sass/app.scss'
		]
	},
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'public'),
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(svg|eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loaders: [
					{
						loader: 'file-loader',
						options: { name: 'images/[name].[hash].[ext]' }
					},
					'img-loader'
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['react-hot-loader', 'babel-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['public'], {
			root: __dirname,
			verbose: true,
			dry: false
		}),
		new ExtractTextPlugin('[name].[chunkhash].css'),
		new webpack.LoaderOptionsPlugin({
			minimize: isProd
		}),
		new PurifyCSSPlugin({
			paths: glob.sync(path.join(__dirname, 'views/**/*.hbs')),
			minimize: isProd
    	}),
		new ManifestPlugin()
	]
};

if (isProd) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
}