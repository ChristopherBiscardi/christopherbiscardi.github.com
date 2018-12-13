/** @jsx jsx */
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";

export default styled.div`
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  display: inline-block;
  line-height: 20px;
  height: 22px;
  padding: 0 7px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border || "pink"};
  background: ${({ theme }) => theme.colors.background || "pink"};
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: 1;
  margin-right: 8px;
  cursor: pointer;
  white-space: nowrap;
`;
