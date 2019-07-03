module.exports = {
  siteMetadata: {
    title: `Chris Biscardi`,
    author: "Chris Biscardi",
    description: "Chris' thoughts and posts",
    siteUrl: "https://www.christopherbiscardi.com/",
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/chrisbiscardi`
      },
      {
        name: `github`,
        url: `https://github.com/christopherbiscardi`
      }
    ]
  },
  mapping: { "Mdx.fields.featuredImage": `File.absolutePath` },
  plugins: [
    {
      resolve: "gatsby-theme-notes",
      options: {
        // contentPath: "../content/note",
        basePath: "/notes",
        mdx: false // use my own gatsby-mdx
      }
    },
    {
      resolve: `gatsby-theme-blog`,
      options: {
        basePath: "/post"
      }
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-og-image`,
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`gatsby-theme-blog`]
      }
    },
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
        name: "images",
        path: `${__dirname}/src/images/`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-serviceworker`,
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
            serialize: ({ query: { site, allBlogPost } }) => {
              return allBlogPost.nodes.map(node => {
                return Object.assign(
                  {},
                  {
                    description: node.excerpt,
                    date: node.date,
                    url: site.siteMetadata.siteUrl + node.url,
                    guid: site.siteMetadata.siteUrl + node.url,
                    custom_elements: [{ "content:encoded": node.parent.html }]
                  }
                );
              });
            },
            query: `
            {
              allBlogPost(
                limit: 1000,
                sort: { order: DESC, fields: [date] }
              ) {
                nodes {
                  excerpt
                  url
                  title
                  date
                  ... on MdxBlogPost {
        parent {
          ... on Mdx {
            html
          }
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
