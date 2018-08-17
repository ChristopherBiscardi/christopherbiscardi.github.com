exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMdx(limit: 1000) {
        edges {
          node {
            fileAbsolutePath
            relativePath
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMdx.edges.forEach(({ node }) => {
      console.log("creating page", node.relativePath);
      createPage({
        path: node.relativePath.slice(0, -4), //node.fileNode.path,
        component: require.resolve(node.fileAbsolutePath),
        context: {
          navItems: node.relativePath.slice(0, -4).split("/")
        } // additional data can be passed via context
      });
    });
  });
};
