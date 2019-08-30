const crypto = require("crypto");
const path = require(`path`);
const slugify = require("@sindresorhus/slugify");
const fs = require("fs");
const { createPrinterNode, runScreenshots } = require("gatsby-plugin-printer");

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
        // tags pages
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

exports.onCreateNode = ({ node, actions, createNodeId }) => {
  const { createNode, deleteNode } = actions;
  if (node.internal.type === "MdxBlogPost") {
    const printerNode = createPrinterNode({
      id: createNodeId(`${node.id} >>> Printer`),
      // fileName is something you can use in opengraph images, etc
      fileName: slugify(node.title),
      // renderDir is relative to `public` by default
      outputDir: "blog-post-images",
      // data gets passed directly to your react component
      data: node,
      // the component to use for rendering. Will get batched with
      // other nodes that use the same component
      component: require.resolve("./src/printer-components/blog-post.js")
    });
  }

  if (
    node.internal.type === "Printer" &&
    node.component ===
      require.resolve(
        "gatsby-theme-dev-tips/src/printer-components/dev-tips-collection.js"
      )
  ) {
    // const oldNode = {...node};
    node.component = require.resolve(
      "./src/printer-components/dev-tips-collection.js"
    );
    // deleteNode(oldNode)
    // createNode(node)
  }
};

exports.onPostBuild = async ({ graphql }) => {
  const data = await graphql(`
    {
      tags: allBlogPost(sort: { fields: [date, title], order: DESC }) {
        byTag: group(field: tags) {
          tag: fieldValue
        }
      }
    }
  `).then(r => {
    if (r.errors) {
      reporter.error(r.errors.join(`, `));
    }
    return r.data;
  });

  const tags = data.tags.byTag
    .filter(({ tag }) => tag !== "")
    .map(({ tag }) => ({
      id: slugify(tag),
      tag
    }));

  await runScreenshots({
    data: tags,
    component: require.resolve("./src/printer-components/blog-post-tags"),
    outputDir: "opengraph-images/tags"
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
