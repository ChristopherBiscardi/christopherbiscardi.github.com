const path = require(`path`);
const slugify = require("slugify");
const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  code {
                    scope
                  }
                  frontmatter {
                    slug
                    url
                    title
                    tags
                  }
                  fileNode {
                    name
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

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          const { frontmatter, fileNode } = node;
          createPage({
            path:
              frontmatter.url ||
              `/post/${frontmatter.slug ||
                slugify(fileNode.name, { lower: true })}`,
            component: componentWithMDXScope(
              require.resolve("./src/blog-post"),
              node.code.scope,
              __dirname
            ),
            context: { id: node.id }
          });
        });
      })
    );
  });
};
