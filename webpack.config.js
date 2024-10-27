import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					process.env.NODE_ENV === 'development'
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].css',
			chunkFilename: '[id].css',
		}),
	],
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 8080,
	},
};
