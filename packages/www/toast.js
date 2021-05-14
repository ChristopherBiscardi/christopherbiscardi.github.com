import SectorSource from "fetch-sector-docs";
// import EggheadSource from "fetch-eggheadio";
import { sourceMdx } from "@toastdotdev/mdx";
import fetch from "node-fetch";
import { Feed } from "feed";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const sourceData = async ({ setDataForSlug }) => {
  const feed = new Feed({
    title: "Chris Biscardi's Digital Garden",
    description: "Rust, Serverless, Jamstack, and more.",
    id: "http://christopherbiscardi.com/",
    link: "http://christopherbiscardi.com/",
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: "http://christopherbiscardi.com/image.png",
    favicon: "http://christopherbiscardi.com/favicon.ico",
    // copyright: "All rights reserved 2013, John Doe",
    // updated: Date.now(), // optional, default = today
    generator: "awesome", // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: "https://christopherbiscardi.com/json",
      atom: "https://christopherbiscardi.com/atom"
    },
    author: {
      name: "Chris Biscardi",
      email: "chris@christopherbiscardi.com",
      link: "https://christopherbiscardi.com"
    }
  });

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
  const feedData = sectorData
    .map(({ updatedAt, title, slug }) => ({
      modified: new Date(updatedAt),
      title,
      slug
    }))
    .concat(
      mdxData.map(({ meta }) => ({
        modified: new Date(meta.date),
        title: meta.title,
        slug: meta.title
      }))
    )
    .concat(
      sectorTwoData.map(({ meta }) => ({
        modified: new Date(meta.modified),
        title: meta.title,
        slug: meta.title
      }))
    )
    .sort((a, b) => b.modified - a.modified);
  console.log({ feedData: feedData.map(({ modified }) => modified) });
  feedData.forEach(post =>
    feed.addItem({
      title: post.title,
      id: `https://www.christopherbiscardi.com/${post.slug}`,
      link: `https://www.christopherbiscardi.com/${post.slug}`,
      description: post.description,
      content: `${post.description}
Read more at https://www.christopherbiscardi.com/${post.slug}`,
      author: [
        {
          name: "Chris Biscardi",
          email: "chris@christopherbiscardi.com",
          link: "https://christopherbiscardi.com"
        }
      ],
      contributor: [],
      date: post.date,
      image: post.image
    })
  );

  await fs.writeFile(path.resolve(__dirname, "public/rss.xml"), feed.rss2());

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
                modified
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
