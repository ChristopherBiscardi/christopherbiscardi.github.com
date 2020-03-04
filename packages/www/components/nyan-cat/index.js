import React from "react";
import nyanCat from "./nyan-cat-rainbow.webp";
//import pinkFluffyUnicorns from './pink-fluffy-unicorns-dancing-on-rainbows.webp'
//import garyNyanSnail from './spongebob-gary-nyan.webp'

// TODO: remove the backgrounds from the other webp files and use them here
const options = [nyanCat /*, pinkFluffyUnicorns, garyNyanSnail*/];

function getRandomAnimation() {
  const max = options.length;
  // get random int from 0 to options.length
  const randomInt = Math.floor(Math.random() * Math.floor(max));
  return options[randomInt];
}

const NyanCat = props => (
  <img {...props} src={getRandomAnimation()} alt="nyan cat rainbow animated" />
);

export default NyanCat;
