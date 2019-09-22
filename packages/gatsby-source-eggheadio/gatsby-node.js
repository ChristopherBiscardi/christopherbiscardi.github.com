const crypto = require("crypto");
const fetch = require("node-fetch");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
  type EggheadTag implements Node {
      id: ID!
      label: String!
      name: String!
      description: String!
  }
  type EggheadLesson implements Node {
      id: ID!
      title: String!
      publishedAt: Date!
      summary: String!
      httpUrl: String!
      state: String!
      primaryTag: EggheadTag
      tags: [EggheadTag!]
  }`);
};

exports.sourceNodes = async ({ reporter, actions, createNodeId }) => {
  const { createNode } = actions;

  if (!process.env.EGGHEAD_LESSON_URL) {
    reporter.warn("Must set `EGGHEAD_LESSON_URL` if you want egghead results");
    return;
  }
  const data = await fetch(process.env.EGGHEAD_LESSON_URL).then(res =>
    res.json()
  );

  await Promise.all(
    data.map(node => {
      const fieldData = {
        id: node.id,
        title: node.title,
        publishedAt: node.published_at,
        summary: node.summary,
        httpUrl: node.http_url,
        state: node.state,
        primaryTag: node.primary_tag,
        tags: node.tags
      };
      return createNode({
        ...fieldData,
        // Required fields.
        id: createNodeId(`${node.id} >>> EggheadLesson`),
        parent: null,
        children: [],
        internal: {
          type: `EggheadLesson`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(fieldData))
            .digest(`hex`),
          content: JSON.stringify(fieldData),
          description: `Egghead Lesson: ${node.title}`
        }
      });
    })
  );
  return;
};
