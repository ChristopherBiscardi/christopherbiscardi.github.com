const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");
const React = require("react");
const ReactDOM = require("react-dom");
const rollup = require("rollup");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const replace = require("rollup-plugin-replace");
const builtins = require("rollup-plugin-node-builtins");
const globals = require("rollup-plugin-node-globals");
const babel = require("rollup-plugin-babel");
const debug = require("debug")("gatsby-plugin-printer");

// const rainbowImgScreened = readFileSync('rainbow-bg-screened.png')

const defaultOutputDir = `gatsby-plugin-printer/images`;

const genCodeBundle = async ({
  componentPath = require.resolve("./default-user-component.js")
} = {}) => {
  debug("componentPath", componentPath);
  // check if component exists
  const fileExists = fs.existsSync(componentPath);
  if (componentPath && !fileExists) {
    const isAbsPath = path.isAbsolute(componentPath);
    const absWarning = isAbsPath
      ? `try using an absolute path to the component`
      : "";
    console.error(
      `gatsby-plugin-printer expected a file at \`${componentPath}\`, but none was found. ${absWarning}`
    );
  }
  // bundle an instance of the application, using the user's component
  const bundle = await rollup.rollup({
    input: require.resolve("./app.js"),
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        presets: ["babel-preset-gatsby"],
        plugins: ["babel-plugin-preval"]
      }),
      commonjs({
        namedExports: {
          "react-dom": Object.keys(ReactDOM),
          react: Object.keys(React)
        }
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        __USER_COMPONENT_PATH__: componentPath
      }),
      builtins(),
      globals()
    ]
  });
  const { output } = await bundle.generate({ format: "iife" });
  // await fs.outputFile("./compiled-code.js", output[0].code);
  return output[0].code;
};

const runScreenshots = async ({ data, code }, puppeteerLaunchOptions = {}) => {
  const browser = await puppeteer.launch(puppeteerLaunchOptions);
  const page = await browser.newPage();
  const html = `
  <html>
  <head>
  <script>${code}</script>
  </head>
  <body>
  </body>
  </html>
`;

  async function screenshotDOMElement({
    path: filePath,
    selector,
    renderDir
  } = {}) {
    if (!filePath) {
      throw new Error(
        `[gatsby-plugin-printer]: screenshotDOMElement requires a filepath to write file to`
      );
    }
    if (!selector) {
      throw Error("[gatsby-plugin-printer]: Please provide a selector.");
    }

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }, selector);

    if (!rect) {
      throw Error(`Could not find element that matches selector: ${selector}.`);
    }

    await fs.mkdirp(path.join("./public/", renderDir));

    return await page.screenshot({
      path: path.join("./public/", renderDir, filePath),
      clip: {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    });
  }

  await page.setContent(html);
  await page.evaluate(
    ({ data }) => {
      let dom = document.querySelector("body");
      dom.innerHTML =
        `<div data-id="empty"></div>` +
        data.map(({ id }) => `<div data-id="${id}"></div>`).join("\n");
    },
    { data }
  );

  await page.evaluate(
    ({ node }) => {
      const $element = document.querySelector(`[data-id="empty"]`);
      window.ogRender($element, node.data);
    },
    { node: data[0] }
  );

  await page.evaluateHandle("document.fonts.ready");

  await Promise.all(
    data.map(node => {
      return page.evaluate(
        ({ node }) => {
          const $element = document.querySelector(`[data-id="${node.id}"]`);
          window.ogRender($element, node.data);
        },
        { node }
      );
    })
  );

  const titlePromises = data.map(({ id, fileName, renderDir }) =>
    screenshotDOMElement({
      path: `${fileName}.png`,
      selector: `[data-id="${id}"] > *`,
      renderDir
    })
  );
  const results = await Promise.all(titlePromises);
  await browser.close();
};

// 2048
// 4096

// runScreenshots()

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  createTypes(`
    type Printer implements Node {
      id: ID!
      fileName: String!
      renderDir: String!
      data: JSON!
      component: String!
    }
  `);
};
exports.onPostBuild = async ({ graphql, cache }, pluginOptions) => {
  // const code = await genCodeBundle();

  const data = await graphql(`
    {
      allPrinter {
        group(field: component) {
          component: fieldValue
          nodes {
            id
            fileName
            renderDir
            data
          }
        }
      }
    }
  `).then(r => {
    if (r.errors) {
      throw new Error(r.errors.join(`, `));
    }

    return r.data;
  });

  await fs.mkdirp(path.join("./public", defaultOutputDir));

  debug("num printer groups", data.allPrinter.group.length);

  await Promise.all(
    data.allPrinter.group.map(async ({ component, nodes }) => {
      debug(`processing '${component}'`);
      const code = await genCodeBundle({ componentPath: component });
      debug(`running ${nodes.length} nodes with ${component}`);
      await runScreenshots(
        {
          data: nodes.map(node => ({
            ...node,
            data: JSON.parse(node.data)
          })),
          code
        },
        pluginOptions.puppeteerLaunchOptions
      );
    })
  );
};
