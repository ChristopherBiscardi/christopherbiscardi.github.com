import React, { Component, Fragment, useRef } from "react";
import { Link as GLink } from "gatsby";
import { Text } from "sens8";
import useComponentSize from "@rehooks/component-size";

const Link = ({ children, ...props }) => (
  <li>
    <GLink
      {...props}
      css={theme => ({
        fontFamily: '"Inter UI", sans-serif',

        textDecoration: "none",
        borderBottom: `1px solid ${theme.colors.text}`,
        padding: "0.5rem",
        fontWeight: "400",
        fontSize: "16px",
        color: theme.colors.text,
        display: "inline-block"
      })}
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
      <div ref={ref} css={{ position: "fixed", width: "100%" }}>
        <div
          css={{
            background: "#592000",
            padding: "1rem",
            color: "white"
          }}
        >
          <Text css={{ marginBottom: 0, maxWidth: "100%" }}>
            Warning: Under Construction. I am using this site as my playground
            as I build&nbsp;
            <a
              css={{ color: "#ff5e99" }}
              href="https://github.com/ChristopherBiscardi/gatsby-mdx"
            >
              gatsby-mdx
            </a>
            <span> and </span>
            <a
              css={{ color: "#ff5e99" }}
              href="https://www.gatsbyjs.org/blog/2018-11-11-introducing-gatsby-themes/"
            >
              gatsby themes
            </a>
            . During this time I will also repost new content&nbsp;
            <a
              css={{ color: "#ff5e99" }}
              href="https://medium.com/@chrisbiscardi"
            >
              to Medium
            </a>
          </Text>
        </div>
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
          </ul>
        </nav>
      </div>
      <div css={{ height }} />
    </Fragment>
  );
};
