const fs = require("fs-extra");
const puppeteer = require("puppeteer");
const React = require("react");
const { renderToString } = require("react-dom");
// const {data} = require('./data')
const slugify = require("@sindresorhus/slugify");
const { readFileSync } = require("fs");
const { Textfit } = require("react-textfit");
const rollup = require("rollup");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const replace = require("rollup-plugin-replace");
const builtins = require("rollup-plugin-node-builtins");
const globals = require("rollup-plugin-node-globals");

const rainbowImg = readFileSync("rainbow-bg.png");
// const rainbowImgScreened = readFileSync('rainbow-bg-screened.png')

const outputDir = `public/rainbow-og-images`;

const runScreenshots = async ({ titles, code }) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const html = `
  <html>
  <head>
  <script>${code}</script>
  <style>
  * {
    box-sizing: border-box;
  }
  /* Clip text element */
  .clip-text {
      font-family: sans-serif;
      font-size: 16px;
      font-weight: bold;
      line-height: 1;
      position: relative;
      display: inline-block;
      margin: 8px;
      padding: 32px 48px;
      text-align: left;
      /* Color fallback */
      color: #fff;
      -webkit-background-clip: text;
  
      -webkit-text-fill-color: transparent;

      box-sizing: border-box;
      width: 796px;
      height: 400px;
  
      background-image: url(data:image/png;base64,${rainbowImg.toString(
        "base64"
      )})
  }
  
  .clip-text:before,
  .clip-text:after {
      position: absolute;
      content: '';
  }
  
  /* Background */
  .clip-text:before {
      z-index: -2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: inherit;
  }
  
  /* Text Background (black zone) */
  .clip-text:after {
    border: 5px solid black;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
      position: absolute;
      z-index: -1;
      top: 16px;
      right: 16px;
      bottom: 16px;
      left: 16px;
      background-color: #000;
  }
  
  /* Change the background position to display letter when the black zone isn't here */
  .clip-text--no-textzone:before {
      background-position: -.75em 0;
  }
  
  .clip-text--no-textzone:after {
      content: none;
  }
  
  /* Use Background-size cover for photo background and no-repeat background */
  .clip-text,
  .clip-text:before {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 50% 50%;
  }
</style>
  </head>
  <body>
  </body>
  </html>
`;

  async function screenshotDOMElement(opts = {}) {
    const padding = "padding" in opts ? opts.padding : 0;
    const path = "path" in opts ? opts.path : null;
    const selector = opts.selector;

    if (!selector) throw Error("Please provide a selector.");

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }, selector);

    if (!rect)
      throw Error(`Could not find element that matches selector: ${selector}.`);

    return await page.screenshot({
      path: `./public/rainbow-og-images/${path}`,
      clip: {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2
      }
    });
  }

  await page.setContent(html);
  await page.evaluate(
    ({ titles }) => {
      let dom = document.querySelector("body");
      dom.innerHTML = titles
        .map(({ slugTitle }) => `<div data-id="${slugTitle}"></div>`)
        .join("\n");
    },
    { titles }
  );
  const head = await page.evaluate(() => {
    return document.head;
  });

  await Promise.all(
    titles.map(({ slugTitle, title }) => {
      page.evaluate(
        ({ title, slugTitle }) => {
          const $element = document.querySelector(`[data-id="${slugTitle}"]`);
          window.ogRender($element, { title });
        },
        { title, slugTitle }
      );
    })
  );
  const body = await page.evaluate(() => {
    return document.body.innerHTML;
  });
  // console.log(body);
  const titlePromises = titles.map(({ slugTitle }) =>
    screenshotDOMElement({
      path: `${slugTitle}.png`,
      selector: `[data-id="${slugTitle}"] > div`,
      padding: 0
    })
  );

  const results = await Promise.all(titlePromises);
  await browser.close();
};

// 2048
// 4096

// runScreenshots()

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
  const bundle = await rollup.rollup({
    input: require.resolve("./app.js"),
    plugins: [
      resolve(),
      commonjs({ namedExports: { "react-dom": ["render"] } }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
      builtins(),
      globals()
    ]
  });
  const { output } = await bundle.generate({ format: "iife" });

  const data = await graphql(`
    {
      allBlogPost {
        nodes {
          title
        }
      }
    }
  `).then(r => {
    if (r.errors) {
      throw new Error(r.errors.join(`, `));
    }

    return r.data;
  });

  if (!(await fs.exists(outputDir))) {
    await fs.mkdirp(outputDir);
  }

  const titles = data.allBlogPost.nodes.map(({ title }) => ({
    title,
    slugTitle: slugify(title)
    // html: `<div class="clip-text">${title}</div>`
  }));
  // fs.writeFileSync("./compiled-rainbow.js", output[0].code);
  await runScreenshots({ titles, code: output[0].code });
};
