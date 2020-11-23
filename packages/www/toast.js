import SectorSource from "fetch-sector-docs";
// import EggheadSource from "fetch-eggheadio";
import { sourceMdx } from "@toastdotdev/mdx";
import fetch from "node-fetch";

export const sourceData = async ({ setDataForSlug }) => {
  const [sectorData, mdxData, sectorTwoData] = await Promise.all([
    SectorSource.sourceNodes({
      setDataForSlug,
      workspace: "516555bc-f69b-47f9-ae7e-48cfd880b34d"
    }),
    sourceMdx({
      setDataForSlug,
      directory: "../../content/posts",
      slugPrefix: "/"
    }),
    sourceSectorTwo({ setDataForSlug })
  ]);
  const sectorMeta = sectorTwoData.map(({ meta }) => meta);
  const allPostsData = sectorMeta
    .concat(
      sectorData.map(
        ({ title, createdAt, updatedAt, slug, contentType, meta }) => ({
          title,
          createdAt,
          updatedAt,
          slug,
          contentType,
          tags: meta.tags || []
        })
      )
    )
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

  return;
};

async function sourceSectorTwo({ setDataForSlug }) {
  const { data, ...etc } = await fetch(
    `https://jvy4kcxtm2.execute-api.us-west-2.amazonaws.com/api`,
    {
      method: "post",
      body: JSON.stringify({
        query: `
          {
            workspaces {
              id
              name
              mdx {
                id
                content
              }
            }
          }
        `
      }),
      headers: {
        "Content-Type": "application/json",
        "x-sector-token": process.env.SECTOR_TOKEN_TWO
      }
    }
  )
    .then(res => res.json())
    .catch(e => console.log(e));
  if (!data) {
    throw new Error(
      "Sector was unable to fetch data, is your secret key correct?"
    );
  }
  const blogMdx = data.workspaces.find(
    workspace => workspace.id === "1kCoG0dVnqYFrpEnvI23vwUcgSL"
  );

  const resultData = await sourceMdx({
    setDataForSlug,
    sources: blogMdx.mdx.map(({ id, content }) => ({ id, source: content })),
    slugPrefix: "/"
  });
  return resultData;
}
