import "resize-observer-polyfill";

import React from "react";
import PageWrapper from "./page-wrapper";
import RootWrapper from "./root-wrapper";

export const wrapPageElement = ({ element, props }, options) => {
  return <PageWrapper {...props}>{element}</PageWrapper>;
};

export const wrapRootElement = ({ element }) => (
  <RootWrapper>{element}</RootWrapper>
);
