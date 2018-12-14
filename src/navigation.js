import React, { Component, Fragment } from "react";
import { Link as GLink } from "gatsby";

const Link = ({ children, ...props }) => (
  <GLink
    {...props}
    css={{
      fontFamily: '"Inter UI", sans-serif',

      textDecoration: "none",
      borderBottom: "1px solid #bbbebf",
      padding: "0.5rem",
      fontWeight: "400",
      fontSize: "16px",
      color: "#bbbebf",
      display: "inline-block"
    }}
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
);

export default class Nav extends Component {
  render() {
    return (
      <Fragment>
        <div css={{ height: "36px" }} />
        <nav
          css={theme => ({
            background: theme.colors.backgroundLayers[3],
            display: "flex",
            position: "fixed",
            width: "100%",
            marginTop: "-36px"
          })}
        >
          <ul
            css={{
              display: "flex",
              listStyleType: "none"
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}
