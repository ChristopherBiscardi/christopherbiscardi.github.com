require("../module-aliases");
const { Command, flags } = require("@oclif/command");
const fs = require("fs").promises;
const path = require("path");
const globby = require("globby");
const { transformAsync } = require("@babel/core");
const { render } = require("../page-renderer-pre");

class BakeCommand extends Command {
  async run() {
    // const { flags } = this.parse(BakeCommand);
    const siteDir = process.cwd();
    const cacheDir = path.resolve(siteDir, ".cache");
    const publicDir = path.resolve(siteDir, "public");

    const pageWrapperPath = path.resolve(cacheDir, "src/page-wrapper");
    const browserPageWrapperPath = "/src/page-wrapper.js";
    const pages = require(path.resolve(cacheDir, "pages.json"));
    // const PageWrapper = require("./.cache/page-wrapper");

    const srcFiles = await globby(["src/**/*.js"]);
    await Promise.all(
      srcFiles.map(async filepath => {
        console.log(filepath);
        const fullFilePath = path.resolve(siteDir, filepath);
        const fileContents = await fs.readFile(fullFilePath, "utf-8");
        const browserComponent = await transformAsync(fileContents, {
          babelrc: false,
          presets: [`@babel/preset-react`],
          plugins: [
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
        const browserComponentPath = path.resolve(publicDir, filepath);
        // make sure directory to put file in exists
        await fs.mkdir(path.dirname(browserComponentPath), { recursive: true });

        await fs.writeFile(
          browserComponentPath,
          browserComponent.code,
          "utf-8"
        );
        const nodeComponent = await transformAsync(fileContents, {
          babelrc: false,
          presets: [`@babel/preset-env`, `@babel/preset-react`]
        });
        const nodeComponentPath = path.resolve(cacheDir, filepath);
        await fs.mkdir(path.dirname(nodeComponentPath), { recursive: true });

        await fs.writeFile(nodeComponentPath, nodeComponent.code, "utf-8");

        if (filepath.startsWith("src/pages")) {
          const pageWrapper = require(pageWrapperPath).default;

          // write HTML file out for page

          const htmlFilePath = path.resolve(
            publicDir,
            filepath.replace("src/pages/", "").replace(".js", ".html")
          );

          const html = await render({
            component: require(nodeComponentPath).default,
            pageWrapper,
            browserPageWrapperPath,
            browserComponentPath: browserComponentPath.replace(
              path.resolve(process.cwd(), "public/"),
              ""
            )
            // pass in page-data here
            // data = {}
          });
          await fs.writeFile(htmlFilePath, html);
        }
        return;
      })
    );

    const pageWrapper = require(pageWrapperPath).default;

    // render pages from pages.json
    await Promise.all(
      pages.map(
        async ({
          slug,
          browserComponentPath,
          nodeComponentPath,
          pageDataPath
        }) => {
          const htmlFilePath = path.resolve(publicDir, `${slug}.html`);

          const html = await render({
            component: require(nodeComponentPath).default,
            pageWrapper,
            browserPageWrapperPath,
            browserComponentPath: browserComponentPath.replace(
              path.resolve(process.cwd(), "public/"),
              ""
            )
            // data = {}
          });
          await fs.writeFile(htmlFilePath, html);
          return;
        }
      )
    );
    // copy page-renderer client into public/
    await fs.mkdir(path.resolve(publicDir, "toast"), { recursive: true });
    await fs.copyFile(
      path.resolve(
        path.dirname(path.dirname(require.resolve("toast"))),
        "static/toast/page-renderer.js"
      ),
      path.resolve(publicDir, "toast/page-renderer.js")
    );

    // TODO transform src/ dir and create pages from src/pages

    this.log(`Baked`);
  }
}

BakeCommand.description = `Bake your application

* Don't bundle
* Render HTML
`;

BakeCommand.flags = {
  // name: flags.string({ char: "n", description: "name to print" })
};

module.exports = BakeCommand;
