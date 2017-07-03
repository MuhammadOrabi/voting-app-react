let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let PurifyCSSPlugin = require('purifycss-webpack');
let glob = require('glob');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ManifestPlugin = require('webpack-manifest-plugin');


let isProd = (process.env.NODE_ENV === 'production');

module.exports = {
	// entry: './assets/app.js',
	entry: {
		app: [
			'./assets/js/app.js',
			'./assets/sass/app.scss'
		]
	},
	output: {
		filename: '[name].js',
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
		new ExtractTextPlugin('[name].css'),
		new webpack.LoaderOptionsPlugin({
			minimize: isProd
		})
	]
};

if (isProd) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
}
