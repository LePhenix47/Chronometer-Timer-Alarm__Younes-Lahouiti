const path = require("path");

module.exports = {
  entry: {
    timer: "./src/index.ts",
    chrono: "./src/chrono.ts",
  },
  // entry: "./src/index.ts",
  mode: "development",
  output: {
    // filename: "main.js",
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
