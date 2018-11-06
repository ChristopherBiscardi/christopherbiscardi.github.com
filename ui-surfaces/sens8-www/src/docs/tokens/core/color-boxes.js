import React from "react";
import theme from "@sens8/tokens";
import { Heading, Text } from "sens8";

export default () => (
  <div
    css={`
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1rem;
    `}
  >
    {Object.entries(theme.colors.raw).map(
      ([k, v]) =>
        typeof v === "string" ? (
          <SingleColorBox title={k} color={v} />
        ) : (
          <MultiColorBox title={k} colors={v} />
        )
    )}
  </div>
);

const SingleColorBox = ({ title, color }) => (
  <div>
    <label>{title}</label>
    <span
      css={`
        display: flex;
        background: ${color};
        height: 10rem;
        width: 10rem;
      `}
    />
  </div>
);

const MultiColorBox = ({ title, colors }) => (
  <div>
    <Heading>{title}</Heading>
    <div>
      {Object.entries(colors).map(([name, color]) => (
        <div
          css={`
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
