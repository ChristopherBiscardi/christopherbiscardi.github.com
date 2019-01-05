/** @jsx jsx */
import React, { Component } from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { fontSize } from "styled-system";

const Span = styled.span`
  fontfamily: ${({ theme, fontFamily }) => theme[fontFamily] || "Comic Sans"};
`;

export { default as Heading } from "./display";
export { default as Text, OL as OrderedList } from "./linear";
export { default as Code } from "./code";
export { default as InterUI } from "./font";

/*
   <Cite>
   <Span>
   <BlockQuote>
   <InlineQuote>
   <P>
   <Time>
 */
