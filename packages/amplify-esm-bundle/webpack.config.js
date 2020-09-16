const path = require("path");
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "amplify-esm-bundle.js",
    globalObject: "this",
    library: "AMPLIFY",
    libraryTarget: "umd"
  },
  mode: "production",
  externals: {},
  // plugins: [new EsmWebpackPlugin()],
  module: {
    // rules: [
    //     {
    //         test: /\.(js)$/,
    //         exclude: /(node_modules|bower_components)/,
    //         use: 'babel-loader'
    //     }
    // ]
  }
};
