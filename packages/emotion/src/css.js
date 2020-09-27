import { serializeStyles } from "./serialize.js";

function css(...args) {
  return serializeStyles(args);
}

export default css;
