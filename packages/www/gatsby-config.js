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
  plugins: [
    {
      resolve: `gatsby-source-sector`,
      options: { workspace: "516555bc-f69b-47f9-ae7e-48cfd880b34d" }
    },
    {
      resolve: "gatsby-plugin-fathom",
      options: {
        siteId: process.env.FATHOM_SITE_ID
      }
    },

    `gatsby-source-eggheadio`,
    `gatsby-plugin-inter`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ["Source Code Pro"]
        }
      }
    },
    `gatsby-plugin-svgr-loader`,
    {
      resolve: `gatsby-plugin-webmention`,
      options: {
        username: "www.christopherbiscardi.com",
        identity: { github: "christopherbiscardi", twitter: "chrisbiscardi" },
        domain: "www.christopherbiscardi.com",
        token: process.env.WEBMENTIONS_TOKEN
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-remove-serviceworker`
  ]
};
