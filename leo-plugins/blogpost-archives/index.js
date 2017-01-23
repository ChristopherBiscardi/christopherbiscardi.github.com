const BundleAnalyzerPlugin = require(
  "webpack-bundle-analyzer"
).BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");

function isProdClientBuild(leo) {
  return leo.pipeline === "site" && leo.bundle === "client" &&
    process.env.NODE_ENV === "production";
}

function isStaticBuild(leo) {
  return leo.pipeline === "site" && leo.bundle === "static";
}

module.exports = function(config, opts) {
  console.log(process.env.NODE_ENV);
  if (isProdClientBuild(opts.leo)) {
    //    config.plugins.push(new BundleAnalyzerPlugin());
    config.plugins.push(new CompressionPlugin({
      asset: "[path][query]",
      //[path].gz[query]
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }));
  }
  if (isStaticBuild(opts.leo)) {
    /* config.plugins.push(new webpack.NormalModuleReplacementPlugin(
       /\/iconv-loader$/,
       "node-noop"
       )); */
  }
  return config;
};
