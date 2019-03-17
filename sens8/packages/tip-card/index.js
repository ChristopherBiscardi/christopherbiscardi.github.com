/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { transparentize } from "polished";
import { useLayers, useLinkColor } from "@sens8/tokens";

const TipCard = props => {
  const backgroundColor = useLayers(1);
  const shadowColor = useLinkColor(1);
  return (
    <div
      {...props}
      css={{
        backgroundColor,
        boxShadow: `0 6px 8px ${transparentize(0.97, shadowColor)},
 0 1px 2px ${transparentize(0.7, shadowColor)}`
      }}
    />
  );
};

export default TipCard;
