const crypto = require("crypto");
const fetch = require("node-fetch");

exports.sourceNodes = async ({}) => {
  if (!process.env.EGGHEAD_LESSON_URL) {
    console.warn("Must set `EGGHEAD_LESSON_URL` if you want egghead results");
    return;
  }
  const data = await fetch(process.env.EGGHEAD_LESSON_URL).then(res =>
    res.json()
  );

  data.map(node => ({
    id: node.id,
    title: node.title,
    publishedAt: node.published_at,
    summary: node.summary,
    httpUrl: node.http_url + `?af=7h4hd0`,
    state: node.state,
    primaryTag: node.primary_tag,
    tags: node.tags
  }));

  return;
};
