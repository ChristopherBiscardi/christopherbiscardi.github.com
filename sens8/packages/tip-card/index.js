/** @jsx jsx */
import React from "react";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { width, color } from "styled-system";
import { opacify } from "polished";

export default styled.div`
  background: ${({ theme }) => theme.colors.raw.blue["70"]};
  box-shadow: 0 6px 8px
      ${({ theme }) => opacify(0.97, theme.colors.raw.blue["80"])},
    0 1px 2px ${({ theme }) => opacify(0.7, theme.colors.raw.blue["80"])};
  color: ${({ theme }) => theme.colors.text} ${width};
`;
//rgba(102, 119, 136, 0.03)
//rgba(102, 119, 136, 0.3)
