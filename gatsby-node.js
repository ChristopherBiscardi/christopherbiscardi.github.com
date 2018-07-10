const path = require(`path`);
const fs = require("fs");
const frontmatter = require("front-matter");
const slugify = require("slugify");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const blogPost = path.resolve(`./src/blog-post.js`);
    resolve(
      graphql(
        `
          {
            allFile {
              edges {
                node {
                  absolutePath
                  extension
                  dir
                  modifiedTime
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

        // Create blog posts pages.
        result.data.allFile.edges.forEach(edge => {
          const fm = frontmatter(
            fs.readFileSync(edge.node.absolutePath, "utf-8")
          ).attributes;
          createPage({
            path: fm.url || `/post/${slugify(fm.title)}`,
            component: blogPost
          });
        });
      })
    );
  });
};
