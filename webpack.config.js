const path = require("path");

module.exports = {
  entry: {
    timer: "./src/index.ts",
    chrono: "./src/chrono.ts",
  },
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    // Cleans the output directory before each build
    //to avoid having the same files
    clean: true,
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
