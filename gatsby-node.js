const path = require(`path`);
const slugify = require("@sindresorhus/slugify");
const fs = require("fs");

exports.sourceNodes = ({ actions: { createTypes }, schema }) => {
  createTypes(`
    interface BlogPost @NodeInterface {
      title: String!
      body: String!
      url: String
      date: Date!
      egghead: String
      isNewsletter: Boolean
    }
  `);

  /* createTypes(
   *   schema.buildObjectType({
   *     name: `MdxBlogPost`,
   *     fields: {
   *       title: {
   *         type: "String!",
   *         resolve(source, args, context, info) {
   *           console.log(source, args, context, info);
   *           return "testing";
   *         }
   *       }
   *     },
   *     interfaces: [`Node`, `BlogPost`]
   *   })
   * ); */
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      // Create a new root query field.
      allBlogPost: {
        type: [`[[BlogPost]!]`],
        resolve: async (source, args, context, info) => {
          /* context.nodeModel.runQuery({
           *   query: { filter: { tags: { eq: `baz` } } },
           *   type: `BlogJson`,
           *   firstOnly: false
           * }) */
          const posts = await context.nodeModel.runQuery({
            query: {
              filter: {
                fields: {
                  sourceInstanceName: { eq: "posts" }
                }
              }
            },
            type: "Mdx"
          });
          console.log(info);
          return posts;
        }
      }
    }
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx(
              filter: { fields: { sourceInstanceName: { eq: "posts" } } }
            ) {
              byTag: group(field: frontmatter___tags) {
                fieldValue
              }
              edges {
                node {
                  id
                  fields {
                    slug
                    webmentionMatchURL
                  }
                  frontmatter {
                    slug
                    url
                    title
                    tags
                  }
                  parent {
                    ... on File {
                      name
                    }
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

        result.data.allMdx.byTag.forEach(({ fieldValue }) => {
          createPage({
            path: `/tags/${fieldValue}`,
            component: require.resolve("./src/content-by-tag"),
            context: {
              tag: fieldValue
            }
          });
        });
        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          const { frontmatter, parent, fields } = node;
          createPage({
            path: fields.slug,
            component: require.resolve("./src/blog-post"),
            context: {
              id: node.id,
              title: frontmatter.title,
              webmentionMatchURL: node.fields.webmentionMatchURL
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const { frontmatter } = node;
    const parent = getNode(node.parent);

    const slug =
      frontmatter.url ||
      `/post/${frontmatter.slug ||
        slugify(frontmatter.title) ||
        slugify(parent.name)}`;

    createNodeField({
      name: `slug`,
      node,
      value: slug
    });

    createNodeField({
      name: `webmentionMatchURL`,
      node,
      value: `https://www.christopherbiscardi.com${slug}/`
    });

    if (parent.internal.type === "File") {
      const ext = path.extname(parent.absolutePath);
      const featuredImage = parent.absolutePath.replace(ext, ".png");
      if (fs.existsSync(featuredImage)) {
        createNodeField({
          name: `featuredImage`,
          node,
          value: featuredImage
        });
      }

      createNodeField({
        name: `sourceInstanceName`,
        node,
        value: parent.sourceInstanceName
      });
    }
  }
};
