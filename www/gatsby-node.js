const crypto = require("crypto");
const path = require(`path`);
const slugify = require("@sindresorhus/slugify");
const fs = require("fs");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                title
                social {
                  name
                  url
                }
              }
            }
            tags: allBlogPost(sort: { fields: [date, title], order: DESC }) {
              byTag: group(field: tags) {
                tag: fieldValue
                edges {
                  node {
                    id
                    excerpt
                    slug
                    title
                    date(formatString: "MMMM DD, YYYY")
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }
        const {
          site: { siteMetadata }
        } = result.data;
        const { title: siteTitle, social: socialLinks } = siteMetadata;

        result.data.tags.byTag
          .filter(({ tag }) => tag !== "")
          .forEach(({ tag, edges: posts }) => {
            createPage({
              path: `/tags/${tag}`,
              component: require.resolve(`./src/templates/tag-page`),
              context: {
                siteTitle,
                socialLinks,
                tag
              }
            });
          });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /@sens8/,
          use: [loaders.js()]
        }
      ]
    }
  });
};
