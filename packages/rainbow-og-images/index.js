const crypto = require("crypto");

const createPrinterNode = ({ id, fileName, renderDir, data, component }) => {
  const fieldData = {
    id,
    fileName,
    renderDir,
    data: JSON.stringify(data),
    component
  };
  return {
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
      description: `Printer: node that contains data to be printed into an image` // optional
    }
  };
};

module.exports = {
  createPrinterNode
};
