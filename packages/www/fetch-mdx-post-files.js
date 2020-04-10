const fs = require("fs").promises;
const slugify = require("@sindresorhus/slugify");
const mdx = require("@mdx-js/mdx");
const util = require("util");
const vm = require("vm");
const {
  transformComponentForBrowser,
  transformComponentForNode
} = require("toast/src/transforms");

exports.sourceData = async ({ createPage, ...options }) => {
  const files = await fs.readdir("../../content/posts");

  return Promise.all(
    files
      .filter(name => name.endsWith("mdx"))
      .map(async filename => {
        console.log("filename", filename);
        const file = await fs.readFile(
          `../../content/posts/${filename}`,
          "utf-8"
        );
        let compiledMDX;
        try {
          compiledMDX = await mdx(file, {});
        } catch (e) {
          console.log(e);
          throw e;
        }
        const component = await transformComponentForNode(compiledMDX);
        const context = { exports: {} };
        vm.createContext(context);
        const script = new vm.Script(component.code);
        script.runInNewContext(context);
        const { meta } = context.exports || {};
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
