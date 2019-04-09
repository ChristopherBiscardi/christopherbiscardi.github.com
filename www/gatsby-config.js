module.exports = {
  siteMetadata: {
    title: `Chris Biscardi`,
    author: "Chris Biscardi",
    description: "Chris' thoughts and posts",
    siteUrl: "https://www.christopherbiscardi.com/",
    social: {
      twitter: `chrisbiscardi`
    }
  },
  mapping: { "Mdx.fields.featuredImage": `File.absolutePath` },
  __experimentalThemes: [
    {
      resolve: "gatsby-theme-digital-garden",
      options: {
        notes: "../content/note",
        mdx: false // use my own gatsby-mdx
      }
    }
  ],
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-og-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-webmention`,
      options: {
        username: "www.christopherbiscardi.com",
        identity: { github: "christopherbiscardi", twitter: "chrisbiscardi" },
        domain: "www.christopherbiscardi.com",
        token: process.env.WEBMENTIONS_TOKEN
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `../content/post/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        globalScope: `import Player from 'react-player';
export default {
  Video: props => <Player {...props} css={{
    margin: 'auto',
    paddingBottom: '1.5rem'
  }}/>
}`,
        defaultLayouts: {
          posts: require.resolve("./src/blog-post.js"),
          default: require.resolve("./src/default-page-layout.js")
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-serviceworker`
  ]
};
