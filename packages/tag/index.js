/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useTextColor, useLayers, useLinkColor } from "@sens8/tokens";

const Tag = props => {
  const textColor = useTextColor();
  const borderColor = useLayers(2);
  const borderColorHover = useLinkColor();
  const backgroundColor = useLayers(0);
  return (
    <span
      {...props}
      css={css`
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        color: ${textColor};
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
        display: inline-block;
        line-height: 20px;
        height: 22px;
        padding: 0 7px;
        border-radius: 4px;
        border: 1px solid ${borderColor};
        background: ${backgroundColor};
        font-size: 12px;
        transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        opacity: 1;
        margin-right: 8px;
        cursor: pointer;
        white-space: nowrap;
        &:hover {
          border-color: ${borderColorHover};
        }
      `}
    />
  );
};

export default Tag;
