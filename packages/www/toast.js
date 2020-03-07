const fs = require("fs").promises;
const path = require("path");

exports.prepData = async ({ cacheDir, publicDir }) => {
  const sectorPageData = require(path.resolve(cacheDir, "pages.json"));
  const allPostsData = sectorPageData.map(
    ({ title, createdAt, updatedAt, slug, contentType }) => ({
      title,
      createdAt,
      updatedAt,
      slug,
      contentType
    })
  );
  await fs.writeFile(
    path.resolve(publicDir, "src/pages/post.json"),
    JSON.stringify({ posts: allPostsData })
  );

  const topPostsData = allPostsData.slice(0, 5);
  await fs.writeFile(
    path.resolve(publicDir, "src/pages/index.json"),
    JSON.stringify({ posts: topPostsData })
  );
};
