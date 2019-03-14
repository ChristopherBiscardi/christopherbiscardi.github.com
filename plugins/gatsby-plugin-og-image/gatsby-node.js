const { GraphQLString } = require("gatsby/graphql");
const mkdirp = require("mkdirp");
const path = require("path");

const { writeOGFile } = require(".");

mkdirp(path.join((process.cwd(), `public`, `static`, `og-image`)));

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === `OGImage`) {
    return {
      src: {
        type: GraphQLString,
        args: {
          text: {
            type: GraphQLString
          }
        },
        resolve: (source, { text = "" }) => writeOGFile({ text })
      }
    };
  }

  // by default return empty object
  return {};
};

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  // Data can come from anywhere, but for now create it manually
  const myData = {
    key: ""
  };

  const nodeContent = JSON.stringify(myData);

  const nodeMeta = {
    id: createNodeId(`og-image-${myData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `OGImage`,
      mediaType: `text/html`,
      content: nodeContent,
      contentDigest: createContentDigest(myData)
    }
  };

  const node = { ...myData, ...nodeMeta };
  createNode(node);
};
