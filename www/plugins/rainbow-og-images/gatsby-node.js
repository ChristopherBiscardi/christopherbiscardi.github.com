const fs = require("fs-extra");
const puppeteer = require("puppeteer");
const React = require("react");
const { renderToString } = require("react-dom");
// const {data} = require('./data')
const slugify = require("@sindresorhus/slugify");
const { readFileSync } = require("fs");

const rainbowImg = readFileSync("rainbow-bg.png");
// const rainbowImgScreened = readFileSync('rainbow-bg-screened.png')

const outputDir = `public/rainbow-og-images`;

const runScreenshots = async ({ titles }) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const html = `
  <html>
  <head>
  <style>
  
  /* Clip text element */
  .clip-text {
      font-family: sans-serif;
      font-size: 3em;
      font-weight: bold;
      line-height: 1;
      position: relative;
      display: inline-block;
      margin: .25em;
      padding: .5em .75em;
      text-align: left;
      /* Color fallback */
      color: #fff;
      -webkit-background-clip: text;
  
      -webkit-text-fill-color: transparent;

      box-sizing: border-box;
      width: 400px;
      height: 200px;
  
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
      position: absolute;
      z-index: -1;
      top: .125em;
      right: .125em;
      bottom: .125em;
      left: .125em;
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
  ${titles.map(
    ({ title, html }) => `<div data-id="${slugify(title)}">${html}</div>`
  )}
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
  await Promise.all(
    titles.map(async ({ title }) => {
      await screenshotDOMElement({
        path: `${slugify(title)}.png`,
        selector: `[data-id="${slugify(title)}"] > div`,
        padding: 0
      });
    })
  );

  await browser.close();
};

// 2048
// 4096

// runScreenshots()

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
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
    html: `<div class="clip-text">${title}</div>`
  }));

  runScreenshots({ titles });
};
