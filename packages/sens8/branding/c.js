/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { keyframes } from "@emotion/core";
import CMask from "../images/c-mask.svg";

export default ({
  size = 80,
  circle = false,
  repeat = true,
  easing = "cubic-bezier(0.86, 0, 0.07, 1)",
  duration = "3s",
  noMask = false
}) => {
  const logoAnimation = keyframes`
from  {    
    transform: translate(-3%, -3%);
}

to {
    transform: translate(-35%, -35%);
}
`;
  return (
    <>
      <div
        id="logo"
        sx={{
          height: size,
          width: size,
          borderRadius: circle ? "50%" : "43%",
          overflow: "hidden",
          position: "relative",
          maskImage: !noMask && `url(${CMask})`,
          maskRepeat: "no-repeat",
          maskSize: "100%",
          // overflow safari fix
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0)"
        }}
      >
        <div
          sx={{
            position: "absolute",
            height: size * 3,
            width: size * 3,
            backgroundImage:
              "linear-gradient(-45deg, #33B7FF 0%, #33B7FF 8%, #70E470 8%, #70E470 16%, #FFDE4B 16%, #FFDE4B 24%, #F25849 24%, #F25849 32%, #33B7FF 32%, #33B7FF 40%, #70E470 40%, #70E470 48%, #FFDE4B 48%, #FFDE4B 56%, #F25849 56%, #F25849 64%, #33B7FF 64%, #33B7FF 72%, #70E470 72%, #70E470 80%, #FFDE4B 80%, #FFDE4B 88%, #F25849 88%, #F25849 100%)",
            backgroundSize: "100% 100%",
            transform: "translate(-3%, -3%)",
            animation: `${logoAnimation} ${duration} ${easing} ${
              repeat ? "infinite" : "1"
            }`
          }}
        />
      </div>
    </>
  );
};
