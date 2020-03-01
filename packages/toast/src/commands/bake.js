const { Command, flags } = require("@oclif/command");
const fs = require("fs").promises;
const path = require("path");
const { render } = require("../page-renderer-pre");

class BakeCommand extends Command {
  async run() {
    // const { flags } = this.parse(BakeCommand);
    const siteDir = process.cwd();
    const cacheDir = path.resolve(siteDir, ".cache");
    const publicDir = path.resolve(siteDir, "public");
    // const PageWrapper = require(path.resolve(process.cwd(), "page-wrapper"));
    const pages = require(path.resolve(cacheDir, "pages.json"));
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
    await fs.mkdir(path.resolve(publicDir, "toast"), { recursive: true });
    await fs.copyFile(
      path.resolve(
        path.dirname(path.dirname(require.resolve("toast"))),
        "static/toast/page-renderer.js"
      ),
      path.resolve(publicDir, "toast/page-renderer.js")
    );
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
