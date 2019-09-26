const fetch = require("node-fetch");
const crypto = require("crypto");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type FaunaDevTipResult implements Node {
      id: ID!
      devTipId: String
      tweetCreatedAt: String
      tweetId: String
    }
  `);
};

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions;

  if (!process.env.FAUNA_GRAPHQL_TOKEN) {
    reporter.warn("Must set `FAUNA_GRAPHQL_TOKEN` if you want fauna results");
    return;
  }
  //process.env.FAUNA_TOKEN
  console.log(
    "query",
    JSON.stringify({
      query: `
        {
          allDevTipTweets(_size: 365) {
            data {
              _ts
              tweetId
              devTipId
              tweetCreatedAt
            }
          }
        }
      `
    })
  );
  const data = await fetch("https://graphql.fauna.com/graphql", {
    method: "post",
    body: JSON.stringify({
      query: `{
        allDevTipTweets(_size:365) {
          data {
            _ts
            tweetId
            devTipId
            tweetCreatedAt
          }
        }
    }
      `
    }),
    headers: {
      Authorization: `Basic ${process.env.FAUNA_GRAPHQL_TOKEN}`,
      "Content-Type": "application/json",
      "Accept-Type": "application/json"
    }
  }).then(res => res.json());
  await Promise.all(
    data.data.allDevTipTweets.data.map(
      ({ _ts, tweetId, devTipId, tweetCreatedAt }) => {
        const fieldData = {
          id: _ts,
          tweetId,
          devTipId,
          tweetCreatedAt
        };
        return createNode({
          ...fieldData,
          // Required fields.
          id: createNodeId(`${_ts} >>> FaunaDevTipResult`),
          parent: null,
          children: [],
          internal: {
            type: `FaunaDevTipResult`,
            contentDigest: crypto
              .createHash(`md5`)
              .update(JSON.stringify(fieldData))
              .digest(`hex`),
            content: JSON.stringify(fieldData),
            description: `Dev tip documents from fauna`
          }
        });
      }
    )
  );
  return;
};
