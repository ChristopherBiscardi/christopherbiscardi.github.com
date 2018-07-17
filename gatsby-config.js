module.exports = {
  siteMetadata: {
    title: `Chris Biscardi's website`
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/post/`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-105803916-1`
      }
    },
    `gatsby-plugin-offline`
  ]
};
