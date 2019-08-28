const crypto = require("crypto");
const { store } = require("gatsby/dist/redux");
const apiRunnerNode = require(`gatsby/dist/utils/api-runner-node`);

const createPrinterNode = ({ id, fileName, renderDir, data, component }) => {
  const fieldData = {
    id,
    fileName,
    renderDir,
    data: JSON.stringify(data),
    component
  };

  const node = {
    ...fieldData,

    // Required fields.
    id,
    parent: null,
    children: [],
    internal: {
      type: `Printer`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
      // mediaType: `text/markdown`, // optional
      content: JSON.stringify(fieldData), // optional
      description: `Printer: node that contains data to be printed into an image`, // optional
      owner: "gatsby-plugin-printer"
    }
  };

  store.dispatch({
    type: `CREATE_NODE`,
    payload: node
  });
  // we're being sneaky, so we have to called onCreateNode for this new node
  return apiRunnerNode(`onCreateNode`, {
    node
    // traceId,
    // parentSpan,
    // traceTags: { nodeId: node.id, nodeType: node.internal.type },
  });
  return;
};

module.exports = {
  createPrinterNode
};
