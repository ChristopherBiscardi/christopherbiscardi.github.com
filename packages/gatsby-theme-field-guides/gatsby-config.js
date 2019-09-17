const path = require("path");

module.exports = {
  plugins: [
    `gatsby-transformer-yaml`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "guides",
        path: `content${path.sep}guides`
      }
    }
  ]
};
