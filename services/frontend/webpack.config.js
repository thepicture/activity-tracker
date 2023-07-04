const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV: environment } = process.env;
const isProductionEnvironment = environment === 'production';

module.exports = {
	mode: isProductionEnvironment ? 'production' : 'development',
	context: path.join(__dirname, './src'),
	entry: {
		app: './index.tsx',
	},
	output: {
		path: path.join(__dirname, './public'),
		filename: '[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		publicPath: '/',
		clean: true,
	},
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							additionalData: (content, loaderContext) => {
								const { resourcePath, rootContext } = loaderContext;
								const relativePath = path.relative(rootContext, resourcePath);

								if (relativePath.includes('app/')) {
									return content;
								} else {
									return `@import "app/index.scss";\n${content}`;
								}
							},
						},
					},
				],
			},
			{
				test: /\.(png|jp(e*)g|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[hash]-[name].[ext]',
						},
					},
				],
			},
		],
	},
	devServer: {
		historyApiFallback: true,
	},
	devtool: isProductionEnvironment && 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
};
