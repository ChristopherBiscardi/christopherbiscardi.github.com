//import palx from "palx";
import rawColors from "./src/colors";
import code from "./src/code";
import utils from "./utils";

// breakpoint values
// any array length works with styled-system
const breakpoints = ["40em", "52em", "64em"];

const colors = {
  text: rawColors.neutral[0],
  background: rawColors.neutral[80],
  raw: rawColors
};

// space is used for margin and padding scales
// it's recommended to use powers of two to ensure alignment
// when used in nested elements
// numbers are converted to px
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

// typographic scale
const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96, 128];
export const baseFontSize = fontSizes[2];

// for any scale, either array or objects will work
const lineHeights = [1, 1.125, 1.25, 1.5];

const fontWeights = {
  normal: 500,
  bold: 700
};

const letterSpacings = {
  normal: "normal",
  caps: "0.25em"
};

// border-radius
const radii = [0, 2, 4, 8];

const borders = [0, "1px solid", "2px solid"];

const shadows = [`0 1px 2px 0 ${colors.text}`, `0 1px 4px 0 ${colors.text}`];

const theme = {
  breakpoints,
  colors,
  code: code(colors),
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacings,
  radii,
  borders,
  shadows,
  utils
};

export default theme;
