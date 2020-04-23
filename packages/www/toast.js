const { promises: fs } = require("fs");
const path = require("path");
const SectorSource = require("fetch-sector-docs");
const EggheadSource = require("fetch-eggheadio");
const MDXPostsSource = require("./fetch-mdx-post-files");

exports.sourceData = async ({ withCache, createPage }) => {
  return Promise.all([
    withCache(
      "sector",
      SectorSource.sourceNodes({
        createPage,
        workspace: "516555bc-f69b-47f9-ae7e-48cfd880b34d"
      })
    ),
    withCache("eggheadio", EggheadSource.sourceData()),
    withCache("mdx-posts", MDXPostsSource.sourceData({ createPage }))
  ]);
};

exports.prepData = async ({ cacheDir, publicDir }) => {
  // have to make sure the directory we want to write in exists
  // We can probably avoid this by offering some kind of "non-filesystem"-based
  // API for adding data to paths
  await fs.mkdir(path.resolve(publicDir, "src/pages"), { recursive: true });

  // prep page data for index and post pages
  const sectorPageData = require(path.resolve(cacheDir, "sector.json"));
  const mdxPostsData = require(path.resolve(cacheDir, "mdx-posts.json"));

  const allPostsData = sectorPageData
    .map(({ title, createdAt, updatedAt, slug, contentType }) => ({
      title,
      createdAt,
      updatedAt,
      slug,
      contentType
    }))
    .concat(
      mdxPostsData.map(({ title, date, slug, tags }) => ({
        title,
        updatedAt: date,
        slug,
        tags,
        contentType: "post"
      }))
    );
  await fs.writeFile(
    path.resolve(publicDir, "src/pages/garden.json"),
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
      tag: (primaryTag && primaryTag.name) || undefined,
      httpUrl
    }));

  const topPostsData = allPostsData
    .sort((b, a) => {
      const da = new Date(a.updatedAt).getTime();
      const db = new Date(b.updatedAt).getTime();
      if (da < db) return -1;
      if (da === db) return 0;
      if (da > db) return 1;
    })
    .filter(({ contentType }) => contentType === "blog-post")
    .slice(0, 5);

  await fs.writeFile(
    path.resolve(publicDir, "src/pages/index.json"),
    JSON.stringify({ posts: topPostsData, eggheadLessons: topEggheadData })
  );
};
