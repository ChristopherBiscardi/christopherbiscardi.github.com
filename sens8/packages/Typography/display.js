import styled, { css } from "react-emotion";
import { fontSize } from "styled-system";

export default styled("h1")``;

const cssHeadings = css`
  font-family: "Inter UI";
  font-weight: 900;

  /* Typographic Color */
  line-height: 1;
  letter-spacing: -0.02em;

  /* Hyphenation */
  hyphenate-limit-lines: 2;
  hyphenate-limit-char: 6 3 2;
  // legacy hyphenate-limit-char support
  hyphenate-limit-before: 3;
  hyphenate-limit-after: 2;
  hyphenate-limit-zone: 8%;
  hyphenate-limit-last: always;

  /* Ligatures */
  font-feature-settings: "dlig" 1, "hist" 1;
  @supports (font-variant-ligatures: discretionary-ligatures) {
    font-feature-settings: normal;
    font-variant-ligatures: discretionary-ligatures historical-ligatures;
  }
  /* numbers */
  font-variant-numeric: lining-nums;
`;
export const H1 = styled.h1`
  ${cssHeadings};
`;
export const H2 = styled.h2`
  ${cssHeadings};
`;
export const H3 = styled.h3`
  ${cssHeadings};
`;
export const H4 = styled.h4`
  ${cssHeadings};
`;
export const H5 = styled.h5`
  ${cssHeadings};
`;
export const H6 = styled.h6`
  ${cssHeadings};
`;
