require("../module-aliases");
const { Command, flags } = require("@oclif/command");
const fs = require("fs").promises;
const path = require("path");
const { transformAsync } = require("@babel/core");
const WebdependenciesAliases = require("../babel/babel-plugin-webdependencies-aliases");

class ShakeCommand extends Command {
  async run() {
    const { flags } = this.parse(ShakeCommand);
    const siteDir = process.cwd();
    const cacheDir = path.resolve(siteDir, ".cache");
    const publicDir = path.resolve(siteDir, "public");
    // const pluginDir = path.resolve(siteDir, "public/data/sector");
    await fs.mkdir(cacheDir, { recursive: true });
    await fs.mkdir(publicDir, { recursive: true });

    let pages = [];
    const createPage = async ({
      // actual code string
      module,
      // resulting page slug
      slug,
      // data to insert into the html page
      data
    }) => {
      // compile module and write out browserComponent to public/
      // browser-runnable JS, minus web module imports
      // const { code, map, ast } = browserComponent;
      const browserComponent = await transformAsync(module, {
        babelrc: false,
        presets: [`@babel/preset-react`],
        plugins: [
          WebdependenciesAliases,
          `@babel/plugin-proposal-class-properties`,
          [
            "snowpack/assets/babel-plugin.js",
            {
              importMap: path.resolve(
                process.cwd(),
                "public/web_modules/import-map.json"
              )
            }
          ]
        ]
      });
      const browserComponentPath = path.resolve(publicDir, `${slug}.js`);
      await fs.writeFile(browserComponentPath, browserComponent.code, "utf-8");
      // write out data file to public/
      const pageDataPath = path.resolve(publicDir, `${slug}.json`);
      await fs.writeFile(pageDataPath, JSON.stringify(data), "utf-8");

      // compile module and write out node component to cache
      // node-requireable component
      const nodeComponent = await transformAsync(module, {
        babelrc: false,
        presets: [
          [`@babel/preset-env`, { targets: { node: "current" } }],
          `@babel/preset-react`
        ],
        plugins: [WebdependenciesAliases]
      });
      const nodeComponentPath = path.resolve(cacheDir, `${slug}.js`);
      await fs.writeFile(nodeComponentPath, nodeComponent.code, "utf-8");

      pages.push({
        slug,
        browserComponentPath,
        nodeComponentPath,
        pageDataPath
      });
      // return the paths? is this helpful?
      return;
      //  {
      //   browserComponentPath,
      //   nodeComponentPath,
      //   pageDataPath
      // };
    };

    // run a toast data processing lifecycle.
    const toastFile = path.resolve(siteDir, "toast.js");
    let toast = {};
    try {
      toast = require(toastFile);
    } catch (e) {
      // no lifecycles defined
    }

    if (toast.sourceData) {
      await toast.sourceData({ createPage, cacheDir, publicDir });
    }

    await fs.writeFile(
      path.resolve(cacheDir, "pages.json"),
      JSON.stringify(pages),
      "utf-8"
    );
    this.log(`Shook.`);
  }
}

ShakeCommand.description = `The part before the bake.

* Fetch data
* Prepare dependencies (run snowpack)
`;

ShakeCommand.flags = {
  //   name: flags.string({ char: "n", description: "name to print" })
};

module.exports = ShakeCommand;
