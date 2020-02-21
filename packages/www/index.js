// require("@babel/register")({
//   configFile: false,
//   babelrc: false,
//   presets: [
//     "@babel/preset-env",
//     [
//       "@babel/preset-react"
//       // {
//       //   "pragma": "dom", // default pragma is React.createElement
//       //   "pragmaFrag": "DomFrag", // default is React.Fragment
//       //   "throwIfNamespace": false // defaults to true
//       // }
//     ]
//   ],
//   plugins: [
//     "@babel/plugin-proposal-class-properties",
//     "www-server-renderer/babel-plugin.js"
//   ],
//   ignore: [
//     function(filepath) {
//       return filepath.includes("node_modules") && !filepath.includes("react");
//     }
//   ]
// });
// require("regenerator-runtime/runtime");

const fs = require("fs");
// const ReactDOM = require("www-server-renderer/react-dom");
// const React = require("www-server-renderer/react");
const fetchSector = require("fetch-sector-docs");
// console.log(ReactDOM);

const htmlTemplate = ({ code, component }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Snowpack - Simple Example</title>
  </head>
  <body>
    <div id="toast-page-section">${code}</div>
    
  </body>
</html>
`;
async function run() {
  const sectorNodes = await fetchSector.sourceNodes({
    workspace: "516555bc-f69b-47f9-ae7e-48cfd880b34d"
  });

  Promise.all(
    sectorNodes.map(async ({ slug, component, content }) => {
      console.log("writing", component);
      fs.writeFileSync(component, content);
      const newPath = component.replace("src", "lib").replace(".js", ".html");
      console.log("newPath", newPath);
      console.log(component);

      return "test";
    })
  ).catch(e => {
    console.log("playwright failed");
    console.log(e);
  });
}

run();
