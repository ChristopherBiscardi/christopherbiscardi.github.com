const { render } = require("preact-render-to-string");
const { h } = require("preact");
// const babel = require("@babel/core");
// const vm = require("vm");
// const { MDXProvider } = require("@mdx-js/preact");
// const { jsx, Global } = require("@emotion/preact-core");

const htmlTemplate = ({
  componentPath,
  pageWrapperPath,
  appHtml
}) => `<!DOCTYPE html>
<script>
window.componentPath = "${componentPath}";
window.wrapperComponentPath = "${pageWrapperPath}";
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

exports.render = async ({
  component,
  pageWrapper,
  browserComponentPath,
  browserPageWrapperPath
}) => {
  const output = render(h(pageWrapper, null, h(component)));
  //   console.log(output);
  return htmlTemplate({
    componentPath: browserComponentPath,
    pageWrapperPath: browserPageWrapperPath,
    appHtml: output
  });
};
