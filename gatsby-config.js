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
  plugins: [
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
        path: `${__dirname}/content/post/`
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
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              });
            },
            query: `
            {
              allMdx(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
            output: "/rss.xml",
            title: "Chris Biscardi RSS Feed"
          }
        ]
      }
    }
  ]
};
