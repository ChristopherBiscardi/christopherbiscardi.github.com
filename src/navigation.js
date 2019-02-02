import React, { Fragment, useRef, useState } from "react";
import { Link as GLink } from "gatsby";
import { Text } from "sens8";
import useComponentSize from "@rehooks/component-size";
import useWindowScrollPosition from "./hooks/use-window-scroll-position.js";

const linkStyles = theme => ({
  fontFamily: '"Inter UI", sans-serif',

  textDecoration: "none",
  borderBottom: `1px solid ${theme.colors.text}`,
  padding: "0.5rem",
  fontWeight: "400",
  fontSize: "16px",
  color: theme.colors.text,
  display: "inline-block"
});

const Link = ({ children, ...props }) => (
  <li>
    <GLink
      {...props}
      css={linkStyles}
      getProps={({ isCurrent }) =>
        isCurrent
          ? {
              css: { color: "#8be9fd" }
            }
          : null
      }
    >
      {children}
    </GLink>
  </li>
);

const useNotice = () => {
  const [{ showNotice, triggerLine }, setNotice] = useState({
    showNotice: true,
    triggerLine: 50
  });
  const { y } = useWindowScrollPosition({});
  if (y > triggerLine && showNotice === true) {
    setNotice({ showNotice: false, triggerLine: 40 });
  } else if (y < triggerLine && showNotice === false) {
    setNotice({ showNotice: true, triggerLine: 50 });
  }
  return showNotice;
};
export default props => {
  const ref = useRef(null);
  const { height } = useComponentSize(ref);
  const showNotice = useNotice();

  return (
    <Fragment>
      <div ref={ref} css={{ position: "fixed", width: "100%" }}>
        <nav
          css={theme => ({
            background: theme.colors.background,
            display: "flex"
          })}
        >
          <ul
            css={{
              display: "flex",
              listStyleType: "none"
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <a
              href="https://pages.convertkit.com/04c24646a3/c136f814fc"
              css={linkStyles}
            >
              Newsletter
            </a>
          </ul>
        </nav>
      </div>
      <div css={{ height }} />
    </Fragment>
  );
};
