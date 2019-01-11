/* eslint-disable getter-return */
import { useState, useEffect } from "react";
import _throttle from "lodash.throttle";

let supportsPassive = false;
try {
  var opts = Object.defineProperty({}, "passive", {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

const getPosition = () => ({
  x: process.env.GATSBY_BUILD_STAGE !== "build-html" ? window.pageXOffset : 0,
  y: process.env.GATSBY_BUILD_STAGE !== "build-html" ? window.pageYOffset : 0
});

const defaultOptions = {
  throttle: 100
};

export default function useWindowScrollPosition(options) {
  const opts = { ...defaultOptions, ...options };

  const [position, setPosition] = useState(getPosition());

  useEffect(() => {
    const handleScroll = _throttle(() => {
      setPosition(getPosition());
    }, opts.throttle);

    window.addEventListener(
      "scroll",
      handleScroll,
      supportsPassive ? { passive: true } : false
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return position;
}
