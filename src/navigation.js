import React, { Fragment, useRef } from "react";
import { Link as GLink } from "gatsby";
import { Heading } from "sens8";
import useComponentSize from "@rehooks/component-size";
import CBLogo from "./logo";

const linkStyles = theme => ({
  fontFamily: '"Inter UI", sans-serif',
  textDecoration: "none",
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

export default props => {
  const ref = useRef(null);
  const { height } = useComponentSize(ref);

  return (
    <Fragment>
      <div ref={ref} css={{ position: "fixed", width: "100%", zIndex: 1 }}>
        <nav
          css={theme => ({
            background: theme.colors.background,
            display: "flex",
            padding: "1rem"
          })}
        >
          <CBLogo height={30} css={{ margin: "auto 0" }} />
          <Heading as="h1" css={{ margin: "auto .3rem" }}>
            <span css={{ color: "#5ca1d6" }}>Chris</span>{" "}
            <span css={{ color: "#bedef5" }}>Biscardi</span>
          </Heading>
          <ul
            css={{
              display: "flex",
              listStyleType: "none"
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/tags">Tags</Link>
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
