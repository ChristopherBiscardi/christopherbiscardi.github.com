import React, { StrictMode } from "react";
import { configure, addDecorator } from "@storybook/react";
import { withConsole } from "@storybook/addon-console";
import { setOptions } from "@storybook/addon-options";
import { ThemeProvider } from "emotion-theming";
import dark from "../packages/Tokens";
import { injectGlobal } from "emotion";

injectGlobal`
body {
  background: ${dark.colors.background}
}`;

setOptions({
  name: "Sens8",
  url: "https://github.com/christopherbiscardi/sens8",
  sortStoriesByKind: true,
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/
});

const Wrapper = storyFn => (
  <StrictMode>
    <ThemeProvider theme={dark}>{storyFn()}</ThemeProvider>
  </StrictMode>
);

addDecorator(Wrapper);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
// automatically import all files ending in *.stories.js
const req = require.context("../packages", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
