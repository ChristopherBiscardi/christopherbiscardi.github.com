import styled from "@emotion/styled";
import { fontSize } from "styled-system";

/**
 * BaseText encode root assumptions about text. Invariants like
 * paragraph "width should be 45-75 characters" that we don't expect
 * to change
 * BaseText also works with styled-system for theming purposes
 */
export const BaseText = styled.span`
  font-family: "Inter UI", sans-serif;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: ${maxWidth};
  font-size: ${({ fontSize }) => fontSize}rem;
`;

/**
 * Paragraphs should always be restricted to between 45 and 75
 * characters. We set this value in ems so it scales with various font
 * sizes
 */
function maxWidth({ maxWidth }) {
  if (!maxWidth || typeof maxWidth !== "number") return undefined;
  if (maxWidth < 23) return "23em";
  if (maxWidth > 38) return "38em";
  return `${Math.round(maxWidth)}em`;
}
