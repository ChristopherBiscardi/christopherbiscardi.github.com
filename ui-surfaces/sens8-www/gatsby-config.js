module.exports = {
  siteMetadata: {
    title: `sens8 docs`
  },
  __experimentalThemes: ["gatsby-theme-docz"],
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "mdx-pages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/docs`,
        name: "mdx-docs"
      }
    },
    `gatsby-plugin-offline`
  ]
};
