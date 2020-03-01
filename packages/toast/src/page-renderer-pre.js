const { render } = require("preact-render-to-string");
const { h } = require("preact");
// const babel = require("@babel/core");
// const vm = require("vm");
// const { MDXProvider } = require("@mdx-js/preact");
// const { jsx, Global } = require("@emotion/preact-core");

const htmlTemplate = ({ componentPath, appHtml }) => `<!DOCTYPE html>
<script>
window.componentPath = "${componentPath}";
</script>
<html lang="en">
  <head>
    <title>Snowpack - Simple Example</title>
  </head>
  <body>
    <div id="toast-page-section">${appHtml}</div>
    <script type="module" src="/toast/page-renderer.js"></script>
  </body>
</html>
`;

exports.render = async ({ component, browserComponentPath }) => {
  const output = render(h(component));
  //   console.log(output);
  return htmlTemplate({
    componentPath: browserComponentPath,
    appHtml: output
  });
};
