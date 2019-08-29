module.exports = options => {
  return {
    siteMetadata: {
      siteUrl: "/"
    },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: "gatsby-theme-dev-tips",
          path: options.contentPath || "dev-tips"
        }
      },
      `gatsby-transformer-yaml`
    ]
  };
};
