/** @jsx jsx */
import { jsx } from "@emotion/preact-core";

// eslint-disable-next-line
const images = preval`
  const fs = require('fs');
  const path = require('path')
  // const fileNames = fs.readdirSync(__dirname + '/logos')
  const fileNames = [
    "default",
    "css",
    "emotion",
    "gatsby",
    "go",
    "graphql",
    "js",
    "mdx",
    "fauna",
    "github"
  ];
  const smallIconsPath = path.resolve(__dirname, 'src/components/small-icons/logos/')
  
  const results = fileNames.map(file => fs.readFileSync(smallIconsPath + '/' + file + '.png', 'base64'));
  module.exports = results.reduce((acc, contents, i) => ({
    ...acc,
    [fileNames[i]]: contents
  }), {})
`;
console.log("what");
console.log(Object.keys(images));
console.log("what2");

// const images = {
//   default: require("./logos/default.png"),
//   css: require("./logos/css.png"),
//   emotion: require("./logos/emotion.png"),
//   gatsby: require("./logos/gatsby.png"),
//   go: require("./logos/go.png"),
//   graphql: require("./logos/graphql.png"),
//   js: require("./logos/js.png"),
//   mdx: require("./logos/mdx.png"),
//   fauna: require("./logos/fauna.png"),
//   github: require("./logos/github.png")
// };

const aliases = {
  golang: "go",
  "gatsby-themes": "gatsby",
  javascript: "js",
  faunadb: "fauna"
};

const aliasKeys = Object.keys(aliases);
const imageKeys = Object.keys(images);

/**
 * Matches a list of keys against the list of icons that
 * exist. returns a default if none match, returns the
 * relevant icon otherwise. Can be weighted in the future.
 *
 * @param {string[]} tags a list of potential keys to match
 * @returns {string} a key that can be used in the Icon component
 * as the icon field
 */
export const iconFromList = (tags = []) => {
  // the default icon
  let icon = "default";

  for (const tag of tags) {
    // search the list of imageKeys and aliases for a match
    const newIcon = imageKeys.concat(aliasKeys).find(key => key === tag);
    if (newIcon) {
      if (aliasKeys.includes(newIcon)) {
        // if the icon is ones of the aliases, use that
        icon = aliases[newIcon];
      } else {
        // otherwise return the icon name
        icon = newIcon;
      }
      break;
    }
  }
  return icon;
};

export default ({ icon }) => (
  <img src={`data:image/png;base64,${images[icon]}`} css={{ height: "20px" }} />
);
