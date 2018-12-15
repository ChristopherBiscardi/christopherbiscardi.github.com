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
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: {
          posts: require.resolve("./src/blog-post.js"),
          default: require.resolve("./src/default-page-layout.js")
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`
  ]
};
