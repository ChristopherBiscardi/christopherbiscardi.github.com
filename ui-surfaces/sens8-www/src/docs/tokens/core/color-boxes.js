import React from "react";
import { Heading, Text } from "sens8";
import { css } from "@emotion/core";
import { withTheme } from "emotion-theming";

export default withTheme(({ theme }) => (
  <div
    css={css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      grid-gap: 2rem;
    `}
  >
    {Object.entries(theme.colors.raw).map(([colorGroupName, v]) => (
      <MultiColorBox key={colorGroupName} title={colorGroupName} colors={v} />
    ))}
  </div>
));

const MultiColorBox = ({ title, colors }) => (
  <div>
    <Heading>{title}</Heading>
    <div>
      {Object.entries(colors).map(([name, color]) => (
        <div
          key={`${name}-${color}`}
          css={css`
            height: 3rem;
            background-color: ${color};
            display: flex;
            align-items: center;
            justify-content: space-around;
          `}
        >
          <span>{name}</span>
          <span>{color}</span>
        </div>
      ))}
    </div>
  </div>
);
