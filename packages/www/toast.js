const { existsSync, promises: fs } = require("fs");
const path = require("path");
const SectorSource = require("fetch-sector-docs");
const EggheadSource = require("fetch-eggheadio");

exports.sourceData = async ({ withCache, createPage }) => {
  return Promise.all([
    withCache(
      "sector",
      SectorSource.sourceNodes({
        createPage,
        workspace: "516555bc-f69b-47f9-ae7e-48cfd880b34d"
      })
    ),
    withCache("eggheadio", EggheadSource.sourceData())
  ]);
};

exports.prepData = async ({ cacheDir, publicDir }) => {
  // have to make sure the directory we want to write in exists
  // We can probably avoid this by offering some kind of "non-filesystem"-based
  // API for adding data to paths
  await fs.mkdir(path.resolve(publicDir, "src/pages"), { recursive: true });

  // prep page data for index and post pages
  const sectorPageData = require(path.resolve(cacheDir, "sector.json"));
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

  // index.html
  const eggheadioData = require(path.resolve(cacheDir, "eggheadio.json"));

  const topEggheadData = eggheadioData
    .sort((b, a) => {
      const da = new Date(a.publishedAt).getTime();
      const db = new Date(b.publishedAt).getTime();
      if (da < db) return -1;
      if (da === db) return 0;
      if (da > db) return 1;
    })
    .slice(0, 5)
    .map(({ id, title, primaryTag, httpUrl }) => ({
      id,
      title,
      tag: primaryTag.name,
      httpUrl
    }));

  const topPostsData = allPostsData.slice(0, 5);
  await fs.writeFile(
    path.resolve(publicDir, "src/pages/index.json"),
    JSON.stringify({ posts: topPostsData, eggheadLessons: topEggheadData })
  );
};
