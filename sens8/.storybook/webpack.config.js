const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.mdx$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"]
            }
          },
          { loader: "@mdx-js/loader" }
        ],

        include: path.resolve(__dirname, "../")
      }
    ]
  }
};
