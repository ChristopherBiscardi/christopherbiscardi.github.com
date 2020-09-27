import { promises as fs } from "fs";
import path from "path";
import SectorSource from "fetch-sector-docs";
import EggheadSource from "fetch-eggheadio";
import * as MDXPostsSource from "./fetch-mdx-post-files.js";

export const sourceData = async ({ withCache, createPage }) => {
  console.log("sourceData");
  return Promise.all([
    SectorSource.sourceNodes({
      createPage,
      workspace: "516555bc-f69b-47f9-ae7e-48cfd880b34d"
    }),
    EggheadSource.sourceData(),
    MDXPostsSource.sourceData({ createPage })
  ]);
};

// exports.prepData = async ({ cacheDir, publicDir }) => {
//   // have to make sure the directory we want to write in exists
//   // We can probably avoid this by offering some kind of "non-filesystem"-based
//   // API for adding data to paths
//   await fs.mkdir(path.resolve(publicDir, "src/pages"), { recursive: true });

//   // prep page data for index and post pages
//   const sectorPageData = require(path.resolve(cacheDir, "sector.json"));
//   const mdxPostsData = require(path.resolve(cacheDir, "mdx-posts.json"));

//   const allPostsData = sectorPageData
//     .map(({ title, createdAt, updatedAt, slug, contentType, meta }) => ({
//       title,
//       createdAt,
//       updatedAt,
//       slug,
//       contentType,
//       tags: meta.tags || []
//     }))
//     .concat(
//       mdxPostsData.map(({ title, date, slug, tags }) => ({
//         title,
//         updatedAt: date,
//         slug,
//         tags,
//         contentType: "post"
//       }))
//     );
//   await fs.writeFile(
//     path.resolve(publicDir, "src/pages/garden.json"),
//     JSON.stringify({ posts: allPostsData })
//   );

//   // index.html
//   const eggheadioData = require(path.resolve(cacheDir, "eggheadio.json"));

//   const topEggheadData = eggheadioData
//     .sort((b, a) => {
//       const da = new Date(a.publishedAt).getTime();
//       const db = new Date(b.publishedAt).getTime();
//       if (da < db) return -1;
//       if (da === db) return 0;
//       if (da > db) return 1;
//     })
//     .slice(0, 5)
//     .map(({ id, title, primaryTag, httpUrl }) => ({
//       id,
//       title,
//       tag: (primaryTag && primaryTag.name) || undefined,
//       httpUrl
//     }));

//   const topPostsData = allPostsData
//     .sort((b, a) => {
//       const da = new Date(a.updatedAt).getTime();
//       const db = new Date(b.updatedAt).getTime();
//       if (da < db) return -1;
//       if (da === db) return 0;
//       if (da > db) return 1;
//     })
//     .filter(({ contentType }) => contentType === "blog-post")
//     .slice(0, 5);

//   await fs.writeFile(
//     path.resolve(publicDir, "src/pages/index.json"),
//     JSON.stringify({ posts: topPostsData, eggheadLessons: topEggheadData })
//   );
// };
