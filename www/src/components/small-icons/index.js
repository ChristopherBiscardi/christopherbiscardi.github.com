import React from "react";

// eslint-disable-next-line
// const images = preval`
//   const fs = require('fs');
//   const fileNames = fs.readdirSync(__dirname + '/logos')

//   module.exports = fileNames.reduce((acc, fileName) => ({
//     ...acc,
//     [fileName.slice(0, -".png".length)]: require(__dirname + '/logos' + '/' + fileName)
//   }))

// `;

const images = {
  default: require("./logos/default.png"),
  css: require("./logos/css.png"),
  emotion: require("./logos/emotion.png"),
  gatsby: require("./logos/gatsby.png"),
  mdx: require("./logos/mdx.png"),
  go: require("./logos/go.png"),
  graphql: require("./logos/graphql.png"),
  js: require("./logos/js.png")
};

const aliases = {
  golang: "go",
  "gatsby-themes": "gatsby",
  javascript: "js"
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
  <img src={images[icon]} css={{ height: "20px" }} />
);
