const fs = require("fs").promises;
const path = require("path");

exports.prepData = async ({ cacheDir, publicDir }) => {
  // have to make sure the directory we want to write in exists
  // We can probably avoid this by offering some kind of "non-filesystem"-based
  // API for adding data to paths
  await fs.mkdir(path.resolve(publicDir, "src/pages"), { recursive: true });

  // prep page data for index and post pages
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
