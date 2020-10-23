import SectorSource from "fetch-sector-docs";
import EggheadSource from "fetch-eggheadio";
import { sourceMdx } from "@toastdotdev/mdx";

export const sourceData = async ({ setDataForSlug }) => {
  const [sectorData, mdxData] = await Promise.all([
    SectorSource.sourceNodes({
      setDataForSlug,
      workspace: "516555bc-f69b-47f9-ae7e-48cfd880b34d"
    }),
    sourceMdx({
      setDataForSlug,
      directory: "../../content/posts",
      slugPrefix: "/"
    })
  ]);

  const allPostsData = sectorData
    .map(({ title, createdAt, updatedAt, slug, contentType, meta }) => ({
      title,
      createdAt,
      updatedAt,
      slug,
      contentType,
      tags: meta.tags || []
    }))
    .concat(
      mdxData
        .map(({ meta }) => meta)
        .map(({ title, date, slug, tags }) => ({
          title,
          updatedAt: date,
          slug,
          tags,
          contentType: "post"
        }))
    );
  await setDataForSlug("/garden", { data: { posts: allPostsData } });

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
  await setDataForSlug("/", {
    data: {
      highlightedLessons: [],
      recentPosts: topPostsData
    }
  });
  return;
};
