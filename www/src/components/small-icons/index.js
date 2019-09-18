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
  css: require("./logos/css.png"),
  emotion: require("./logos/emotion.png"),
  gatsby: require("./logos/gatsby.png"),
  mdx: require("./logos/mdx.png"),
  go: require("./logos/go.png"),
  graphql: require("./logos/graphql.png"),
  js: require("./logos/js.png")
};

// console.log(images);

export default ({ icon }) => (
  <img src={images[icon]} css={{ height: "20px" }} />
);
