import React, { Fragment, useRef } from "react";
import { Link as GLink } from "gatsby";
import { Heading } from "sens8";
import useComponentSize from "@rehooks/component-size";
import { useTextColor, useLayers } from "@sens8/tokens";
import CBLogo from "./logo";

const linkStyles = ({ textColor }) => ({
  fontFamily: '"Inter UI", sans-serif',
  textDecoration: "none",
  padding: "0.5rem",
  fontWeight: "400",
  fontSize: "16px",
  color: textColor,
  display: "inline-block"
});

const Link = ({ children, ...props }) => {
  const textColor = useTextColor();
  return (
    <li>
      <GLink
        {...props}
        css={linkStyles({ textColor })}
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
};

export default props => {
  const ref = useRef(null);
  const { height } = useComponentSize(ref);
  const textColor = useTextColor();
  const backgroundColor = useLayers(0);
  return (
    <Fragment>
      <div ref={ref} css={{ position: "fixed", width: "100%", zIndex: 1 }}>
        <nav
          css={{
            background: backgroundColor,
            display: "flex",
            padding: "1rem"
          }}
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
            <Link to="/notes">Notes</Link>
            <Link to="/tags">Tags</Link>
            <li>
              <a
                href="https://pages.convertkit.com/04c24646a3/c136f814fc"
                css={linkStyles({ textColor })}
              >
                Newsletter
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div css={{ height }} />
    </Fragment>
  );
};
