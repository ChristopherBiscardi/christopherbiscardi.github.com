import { useState, useEffect } from "react";
import _throttle from "lodash.throttle";
console.log("passive");
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
console.log("supportsPassive", supportsPassive);
const getPosition = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset
});

const defaultOptions = {
  throttle: 100
};

export default function useWindowScrollPosition(options) {
  console.log("useWindowScrollPosition");
  const opts = { ...defaultOptions, ...options };

  const [position, setPosition] = useState(getPosition());
  console.log(position);

  useEffect(() => {
    console.log("useEffect");
    const handleScroll = _throttle(() => {
      console.log("handleScroll");
      setPosition(getPosition());
    }, opts.throttle);

    window.addEventListener(
      "scroll",
      handleScroll,
      supportsPassive ? { passive: true } : false
    );

    return () => {
      console.log("removeEventListener");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return position;
}
