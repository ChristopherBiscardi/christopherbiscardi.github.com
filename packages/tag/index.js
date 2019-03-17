/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useFont, useTextColor, useLayers, useLinkColor } from "@sens8/tokens";

const Tag = props => {
  const textColor = useTextColor();
  const borderColor = useLayers(2);
  const borderColorHover = useLinkColor();
  const backgroundColor = useLayers(0);
  const fontFamilyStyle = useFont("content");
  return (
    <span
      {...props}
      css={[
        {
          fontVariant: "tabular-nums",
          lineHeight: 1.5,
          color: textColor,
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "inline-block",
          lineHeight: "20px",
          height: "22px",
          padding: "0 7px",
          borderRadius: "4px",
          border: `1px solid ${borderColor}`,
          background: backgroundColor,
          fontSize: "12px",
          transition: "all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)",
          opacity: 1,
          marginRight: "8px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          "&:hover": {
            borderColor: borderColorHover
          }
        },
        fontFamilyStyle
      ]}
    />
  );
};

export default Tag;
