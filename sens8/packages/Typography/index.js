import React, { Component } from "react";
import styled, { injectGlobal, css } from "react-emotion";
import { fontSize } from "styled-system";

injectGlobal`
@font-face {
  font-family: 'Inter UI';
  font-style:  normal;
  font-weight: 400;
  src: url("font-files/Inter-UI-Regular.woff2?v=2.5") format("woff2"),
       url("font-files/Inter-UI-Regular.woff?v=2.5") format("woff");
}
@font-face {
  font-family: 'Inter UI';
  font-style:  italic;
  font-weight: 400;
  src: url("font-files/Inter-UI-Italic.woff2?v=2.5") format("woff2"),
       url("font-files/Inter-UI-Italic.woff?v=2.5") format("woff");
}

@font-face {
  font-family: 'Inter UI';
  font-style:  normal;
  font-weight: 500;
  src: url("font-files/Inter-UI-Medium.woff2?v=2.5") format("woff2"),
       url("font-files/Inter-UI-Medium.woff?v=2.5") format("woff");
}
@font-face {
  font-family: 'Inter UI';
  font-style:  italic;
  font-weight: 500;
  src: url("font-files/Inter-UI-MediumItalic.woff2?v=2.5") format("woff2"),
       url("font-files/Inter-UI-MediumItalic.woff?v=2.5") format("woff");
}

@font-face {
  font-family: 'Inter UI';
  font-style:  normal;
  font-weight: 700;
  src: url("font-files/Inter-UI-Bold.woff2?v=2.5") format("woff2"),
       url("font-files/Inter-UI-Bold.woff?v=2.5") format("woff");
}
@font-face {
  font-family: 'Inter UI';
  font-style:  italic;
  font-weight: 700;
  src: url("font-files/Inter-UI-BoldItalic.woff2?v=2.5") format("woff2"),
       url("font-files/Inter-UI-BoldItalic.woff?v=2.5") format("woff");
}

@font-face {
  font-family: 'Inter UI';
  font-style:  normal;
  font-weight: 900;
  src: url("font-files/Inter-UI-Black.woff2?v=2.5") format("woff2"),
       url("font-files/Inter-UI-Black.woff?v=2.5") format("woff");
}
@font-face {
  font-family: 'Inter UI';
  font-style:  italic;
  font-weight: 900;
  src: url("font-files/Inter-UI-BlackItalic.woff2?v=2.5") format("woff2"),
       url("font-files/Inter-UI-BlackItalic.woff?v=2.5") format("woff");
}
`;

const Span = styled.span`
  fontfamily: ${({ theme, fontFamily }) => theme[fontFamily] || "Comic Sans"};
`;

export { default as Heading } from "./display";
export { default as Text } from "./linear";
export { default as Code } from "./code";

/*
   <Cite>
   <Span>
   <BlockQuote>
   <InlineQuote>
   <P>
   <Time>
 */
