import * as React from "react";
import createCache from "./cache/index.js";
import { isBrowser } from "./utils.js";

let EmotionCacheContext = React.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== "undefined" ? createCache() : null
);

export let ThemeContext = React.createContext({});
export let CacheProvider = EmotionCacheContext.Provider;

let withEmotionCache = function withEmotionCache(func) {
  let render = (props, ref) => {
    return React.createElement(EmotionCacheContext.Consumer, {}, cache =>
      func(props, cache, ref)
    );
  };
  // $FlowFixMe
  return React.forwardRef(render);
};

if (!isBrowser) {
  class BasicProvider extends React.Component {
    state = { value: createCache() };
    render() {
      return React.createElement(
        EmotionCacheContext.Provider,
        { ...this.state },
        this.props.children(this.state.value)
      );
    }
  }

  withEmotionCache = function withEmotionCache(func) {
    return props =>
      React.createElement(EmotionCacheContext.Consumer, {}, context => {
        if (context === null) {
          return React.createElement(BasicProvider, {}, newContext => {
            return func(props, newContext);
          });
        } else {
          return func(props, context);
        }
      });
  };
}

export { withEmotionCache };
