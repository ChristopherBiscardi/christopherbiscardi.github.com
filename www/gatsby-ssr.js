import React from "react";
import RootWrapper from "./root-wrapper";

export const wrapRootElement = ({ element }) => (
  <RootWrapper>{element}</RootWrapper>
);
