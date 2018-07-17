import React, { Component } from "react";
import styled, { css } from "react-emotion";

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
export const Heading = ({ level, children }) => {
  const RenderComponent = BaseHeading.withComponent(
    headings[level - 1] || "h2"
  );
  return <RenderComponent level={level}>{children}</RenderComponent>;
};

const BaseHeading = styled.h2`
  font-size: "30px";
`;
// TODO: Auto-leveling Header
export const H = ({ level }) => {};
