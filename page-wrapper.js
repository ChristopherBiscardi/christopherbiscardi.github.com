import React from "react";
import posed, { PoseGroup } from "react-pose";

const PosedContainer = posed.div({
  enter: { opacity: 1, delay: 100, beforeChildren: true },
  exit: { opacity: 0 }
});

export default ({ children, location, ...props }) => (
  <PoseGroup>
    <PosedContainer key={location.key}>{children}</PosedContainer>
  </PoseGroup>
);
