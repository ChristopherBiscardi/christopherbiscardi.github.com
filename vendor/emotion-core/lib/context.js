function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/** @jsx h */
import { h, Component, createContext } from "preact";
import { forwardRef } from "preact/compat";
import createCache from "@emotion/cache";
import { isBrowser } from "./utils";
let EmotionCacheContext = createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== "undefined" ? createCache() : null
);
export let ThemeContext = createContext({});
export let CacheProvider = EmotionCacheContext.Provider;

let withEmotionCache = function withEmotionCache(func) {
  let render = (props, ref) => {
    return h(EmotionCacheContext.Consumer, null, cache => {
      return func(props, cache, ref);
    });
  };

  return forwardRef(render);
};

if (!isBrowser) {
  class BasicProvider extends Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "state", {
        value: createCache()
      });
    }

    render() {
      return h(
        EmotionCacheContext.Provider,
        this.state,
        this.props.children(this.state.value)
      );
    }
  }

  withEmotionCache = function withEmotionCache(func) {
    return props =>
      h(EmotionCacheContext.Consumer, null, context => {
        if (context === null) {
          return h(BasicProvider, null, newContext => {
            return func(props, newContext);
          });
        } else {
          return func(props, context);
        }
      });
  };
}

export { withEmotionCache };
