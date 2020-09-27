import * as React from "react";
import { withEmotionCache, ThemeContext } from "./context.js";
import { insertStyles } from "./utils/index.js";
import { isBrowser } from "./utils.js";

import { StyleSheet } from "./sheet.js";
import { serializeStyles } from "./serialize.js";

let warnedAboutCssPropForGlobal = false;

export let Global = /* #__PURE__ */ withEmotionCache((props, cache) => {
  if (
    process.env.NODE_ENV !== "production" &&
    !warnedAboutCssPropForGlobal &&
    // check for className as well since the user is
    // probably using the custom createElement which
    // means it will be turned into a className prop
    // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
    (props.className || props.css)
  ) {
    console.error(
      "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
    );
    warnedAboutCssPropForGlobal = true;
  }
  let styles = props.styles;

  if (typeof styles === "function") {
    return React.createElement(ThemeContext.Consumer, {}, theme => {
      let serialized = serializeStyles([styles(theme)]);

      return React.createElement(InnerGlobal, {
        serialized: serialized,
        cache: cache
      });
    });
  }
  let serialized = serializeStyles([styles]);

  return React.createElement(InnerGlobal, {
    serialized: serialized,
    cache: cache
  });
});

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

class InnerGlobal extends React.Component {
  sheet;
  componentDidMount() {
    this.sheet = new StyleSheet({
      key: `${this.props.cache.key}-global`,
      nonce: this.props.cache.sheet.nonce,
      container: this.props.cache.sheet.container
    });
    // $FlowFixMe
    let node = document.querySelector(
      `style[data-emotion-${this.props.cache.key}="${this.props.serialized.name}"]`
    );

    if (node !== null) {
      this.sheet.tags.push(node);
    }
    if (this.props.cache.sheet.tags.length) {
      this.sheet.before = this.props.cache.sheet.tags[0];
    }
    this.insertStyles();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.serialized.name !== this.props.serialized.name) {
      this.insertStyles();
    }
  }
  insertStyles() {
    if (this.props.serialized.next !== undefined) {
      // insert keyframes
      insertStyles(this.props.cache, this.props.serialized.next, true);
    }
    if (this.sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      let element = this.sheet.tags[this.sheet.tags.length - 1]
        .nextElementSibling;
      this.sheet.before = element;
      this.sheet.flush();
    }
    this.props.cache.insert(``, this.props.serialized, this.sheet, false);
  }

  componentWillUnmount() {
    this.sheet.flush();
  }
  render() {
    if (!isBrowser) {
      let { serialized } = this.props;

      let serializedNames = serialized.name;
      let serializedStyles = serialized.styles;
      let next = serialized.next;
      while (next !== undefined) {
        serializedNames += " " + next.name;
        serializedStyles += next.styles;
        next = next.next;
      }

      let shouldCache = this.props.cache.compat === true;

      let rules = this.props.cache.insert(
        ``,
        { name: serializedNames, styles: serializedStyles },
        this.sheet,
        shouldCache
      );

      if (!shouldCache) {
        return React.createElement("style", {
          [`data-emotion-${this.props.cache.key}`]: serializedNames,
          dangerouslySetInnerHTML: { __html: rules },
          nonce: this.props.cache.sheet.nonce
        });
      }
    }
    return null;
  }
}
