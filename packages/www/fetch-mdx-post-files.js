import { promises as fs } from "fs";
import fsReg from "fs";
import json5 from "json5";
import slugify from "@sindresorhus/slugify";
import mdx from "@mdx-js/mdx";
import util from "util";
import vm from "vm";
import rehypePrism from "rehype-prism-mdx";
import rehypeSlug from "rehype-slug";
import rehypeLink from "rehype-autolink-headings";
import parse from "rehype-parse";
import unified from "unified";
import visit from "unist-util-visit";

// const {
//   // transformComponentForBrowser,
//   transformComponentForNode
// } = require("toast/src/transforms");

const corgi = fsReg.readFileSync("./corgi.svg");

const parseSvg = unified().use(parse, {
  emitParseErrors: true,
  duplicateAttribute: false
});

// { [Function: processor]
//   data: [Function: data],
//   freeze: [Function: freeze],
//   attachers: [ [ [Function: parse], [Object] ] ],
//   use: [Function: use],
//   parse: [Function: parse],
//   stringify: [Function: stringify],
//   run: [Function: run],
//   runSync: [Function: runSync],
//   process: [Function: process],
//   processSync: [Function: processSync] }

let parsedCorgi;
try {
  parsedCorgi = parseSvg.runSync(parseSvg.parse(corgi)).children[0].children[1]
    .children;
} catch (e) {
  console.log(e);
}

export const sourceData = async ({ createPage, ...options }) => {
  // console.log("sourceData");
  const files = await fs.readdir("../../content/posts");

  return Promise.all(
    files
      .filter(name => name.endsWith("mdx"))
      .map(async filename => {
        // console.log("filename", filename);
        let meta = {};
        const remarkPluckMeta = _options => tree => {
          visit(tree, "export", ast => {
            if (ast.value.startsWith("export const meta = ")) {
              const obj = ast.value
                .replace(/^export const meta = /, "")
                .replace(/;$/, "");
              meta = json5.parse(obj);
            }
          });
          return tree;
        };

        const file = await fs.readFile(
          `../../content/posts/${filename}`,
          "utf-8"
        );
        let compiledMDX;
        // console.log("compiled");
        try {
          compiledMDX = await mdx(file, {
            remarkPlugins: [remarkPluckMeta],
            rehypePlugins: [
              rehypePrism,
              rehypeSlug,
              [
                rehypeLink,
                {
                  properties: {
                    style: "position: absolute; right: calc(100% + 5px);"
                  },
                  content: {
                    type: "element",
                    tagName: "corgilink",
                    properties: { className: ["corgi-heading-link"] },
                    children: []
                    // children: [parsedCorgi]
                  }
                }
              ]
            ]
          });
        } catch (e) {
          console.log(e);
          throw e;
        }
        // const component = await transformComponentForNode(compiledMDX);
        // const context = { exports: {} };
        // vm.createContext(context);
        // const script = new vm.Script(component.code);
        // script.runInNewContext(context);

        //   let slug;
        if (!meta.slug && meta.title) {
          meta.slug = slugify(meta.title);
        }
        if (!meta.slug) {
          throw new Error("No slug found for", filename);
        }

        // remove leading and trailing slashes
        meta.slug = meta.slug.replace(/^\//, "").replace(/\/$/, "");
        if (!meta.slug.match(/^\d\d\d\d/)) {
          // console.log("replacing");
          meta.slug = "post/" + meta.slug;
          // console.log(meta.slug);
        }

        await createPage({
          module: `/** @jsx mdx */
            import {mdx} from '@mdx-js/preact';
            ${compiledMDX}`,
          slug: meta.slug,
          data: { ...meta }
        });
        // console.log(meta);
        // writeDataFile
        return {
          // id,
          // content,
          ...meta
        };
      })
  );
};
