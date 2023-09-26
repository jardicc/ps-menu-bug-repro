/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WatchExternalFilesPlugin = require("webpack-watch-external-files-plugin");

module.exports = (env) => {
	
	const isProduction = env.mode === "prod";

	console.log(isProduction ? "PRODUCTION BUILD" : "DEVELOPMENT BUILD");
	console.log(env);

	const config = {
		mode: isProduction ? "production" : "development",
		devtool: isProduction ? undefined : "eval-source-map",
		entry: "./src/Main.ts",
		output: {
			filename: "index.js",
			path: path.resolve(__dirname, "dist"),
		},
		resolve: {
			// Add '.ts' and '.tsx' as resolvable extensions.
			extensions: [".ts", ".tsx", ".js"],
			fallback: {
				os: false,
				fs: false,
			},
		},
		externals: {
			photoshop: "commonjs2 photoshop",
			uxp: "commonjs2 uxp",
			fs: "commonjs2 fs",
		},
		module: {
			rules: [
				{
					test: /\.ts(x?)$/i,
					exclude: /node_modules/,
					use: ["ts-loader"],
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new CopyPlugin({
				patterns: [
					{from: "uxp", to: "./"},
				],
			}),
			// this will copy manifest files and icon files on change 
			// without need to explicitly trigger watcher or restart it
			new WatchExternalFilesPlugin({
				files: ["/uxp/**"],
			}),
		],
	};

	// Additional steps for production build
	if (isProduction) {
		// Make code smaller but keep it somehow readable since it is open-source.
		// So it will be easier to debug production builds.
		config.optimization = {
			moduleIds: "named",
			minimize: false,
		};
	}

	return config;
};