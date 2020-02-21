const path = require("path");
module.exports = {
  siteMetadata: {
    title: `Chris Biscardi`,
    author: "Chris Biscardi",
    description: "Chris' thoughts and posts",
    siteUrl: "https://www.christopherbiscardi.com/"
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
    }
  ]
};
