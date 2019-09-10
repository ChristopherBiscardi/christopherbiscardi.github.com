import React from "react";

const images = preval`
const fs = require('fs');
module.exports = fs.readdirSync('./logos')`;

console.log(images);

const ima = {
  css: require("./logos/css.png"),
  emotion: require("./logos/emotion.png"),
  gatsby: require("./logos/gatsby.png"),
  mdx: require("./logos/mdx.png"),
  go: require("./logos/go.png"),
  graphql: require("./logos/graphql.png"),
  js: require("./logos/js.png")
};

export default ({ icon }) => <img src={images[icon]} />;
