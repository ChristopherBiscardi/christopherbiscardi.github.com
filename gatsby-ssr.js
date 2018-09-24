import React from "react";
import { ThemeProvider } from "emotion-theming";
import { MDXProvider } from "@mdx-js/tag";

import PageWrapper from "./page-wrapper";
import RootWrapper from "./root-wrapper";

export const wrapPageElement = ({ element, props }) => {
  return <PageWrapper {...props}>{element}</PageWrapper>;
};

export const wrapRootElement = ({ element }) => (
  <RootWrapper>{element}</RootWrapper>
);
