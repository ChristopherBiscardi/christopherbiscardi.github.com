const path = require("path");
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
      },
      {
        name: `twitch`,
        url: `https://www.twitch.tv/chrisbiscardi`
      },
      {
        name: "youtube",
        url: `https://www.youtube.com/channel/UCiSIL42pQRpc-8JNiYDFyzQ`
      }
    ]
  },
  mapping: { "Mdx.fields.featuredImage": `File.absolutePath` },
  plugins: [
    `gatsby-source-eggheadio`,
    `gatsby-theme-field-guides`,
    `gatsby-plugin-inter`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Source Code Pro"]
        }
      }
    },
    {
      resolve: `gatsby-theme-devtips`,
      options: {
        contentPath: path.resolve(".", `content/dev-tips`),
        devtips: [
          {
            name: "MDX",
            slug: "mdx",
            description:
              "MDX is an authorable format that lets you seamlessly write JSX in your Markdown documents. You can import components, such as interactive charts or alerts, and embed them within your content. This makes writing long-form content with components a blast 🚀"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-printer`,
      options: {
        puppeteerLaunchOptions: {
          headless: true
        }
      }
    },
    `gatsby-plugin-svgr-loader`,
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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages/`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-remark-images`,
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
                    title: node.title,
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
                  url: slug
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
