exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMdx(limit: 1000) {
        edges {
          node {
            parent {
              ... on File {
                absolutePath
                relativePath
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMdx.edges.forEach(({ node }) => {
      console.log("creating page", node.parent.relativePath);
      createPage({
        path: node.parent.relativePath.slice(0, -4), //node.fileNode.path,
        component: require.resolve(node.parent.absolutePath),
        context: {
          navItems: node.parent.relativePath.slice(0, -4).split("/")
        } // additional data can be passed via context
      });
    });
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
          include: /(sens8\/packages|@sens8)/,
          use: [loaders.js()]
        }
      ]
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === `develop` || stage === `develop-html`
      }),
      plugins.provide({
        Emotion: "@emotion/core"
      })
    ]
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: `babel-plugin-emotion`,
    options: {
      sourceMap: process.env.NODE_ENV !== `production`,
      autoLabel: process.env.NODE_ENV !== `production`,
      hoist: process.env.NODE_ENV === `production`
    }
  });
};
