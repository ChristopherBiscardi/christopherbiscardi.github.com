/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useCodeTheme } from "@sens8/tokens";

export default ({ is, children, lang = "markup", ...etc }) => {
  const theme = useCodeTheme();
  const props = {
    ...etc,
    className: etc.className ? etc.className : `language-${lang}`
  };
  // inline code
  if (!is) {
    return (
      <Highlight
        {...defaultProps}
        theme={theme.code || defaultProps.theme}
        code={children.trim()}
        language={lang}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <code className={className} style={{ ...style, display: "inline" }}>
            {tokens.map((line, i) =>
              line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))
            )}
          </code>
        )}
      </Highlight>
    );
  }

  // default to Block
  return (
    <Highlight
      {...defaultProps}
      theme={theme.code || defaultProps.theme}
      code={children.trim()}
      language={lang}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
