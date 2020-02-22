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
    return (
      <EmotionCacheContext.Consumer>
        {cache => {
          return func(props, cache, ref);
        }}
      </EmotionCacheContext.Consumer>
    );
  };

  return forwardRef(render);
};

if (!isBrowser) {
  class BasicProvider extends Component {
    state = { value: createCache() };
    render() {
      return (
        <EmotionCacheContext.Provider {...this.state}>
          {this.props.children(this.state.value)}
        </EmotionCacheContext.Provider>
      );
    }
  }

  withEmotionCache = function withEmotionCache(func) {
    return props => (
      <EmotionCacheContext.Consumer>
        {context => {
          if (context === null) {
            return (
              <BasicProvider>
                {newContext => {
                  return func(props, newContext);
                }}
              </BasicProvider>
            );
          } else {
            return func(props, context);
          }
        }}
      </EmotionCacheContext.Consumer>
    );
  };
}

export { withEmotionCache };
