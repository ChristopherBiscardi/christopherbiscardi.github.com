import React from "react";
import { ThemeProvider } from "theme-ui";
import tokens from "@sens8/tokens";

export default ({ element }) => (
  <ThemeProvider theme={tokens}>{element}</ThemeProvider>
);
