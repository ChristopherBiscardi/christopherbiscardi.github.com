/** @jsx jsx */
import { jsx, Global } from "@emotion/preact-core";
import Logo from "./components/logos/logo-full.js";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/preact";

const maxWidth = "800px";

const nav = [
  { displayName: "Posts", url: "/post" },
  { displayName: "Notes", url: "/notes" },
  { displayName: "DevTips", url: "/devtips" },
  // { displayName: "Tags", url: "/tags" },
  { displayName: "Discord", url: "https://discord.gg/S9Gdagv" },
  {
    displayName: "Newsletter",
    url: "https://pages.convertkit.com/04c24646a3/c136f814fc"
  }
];

const navLinkStyles = {
  color: "#eef1f7",
  fontWeight: 250,
  fontSize: ".9rem",
  textDecoration: "none"
};

const Header = props => (
  <header
    css={{
      display: "flex",
      height: "75px",
      maxWidth,
      margin: "auto",
      marginTop: "30px",
      flexWrap: "wrap"
    }}
  >
    <div>
      <a href="/" css={{ display: "flex", flex: 1, marginTop: "7px" }}>
        <Logo />
      </a>
    </div>
    <nav css={{ display: "flex", flex: 1 }}>
      <ul
        css={{
          listStyleType: "none",
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          flexWrap: "wrap",
          padding: 0,
          marginTop: "-2px"
        }}
      >
        {nav.map(({ displayName, url }) => {
          return (
            <li
              key={displayName + url}
              css={{ marginLeft: "2rem", marginTop: "18px" }}
            >
              <a href={url} css={navLinkStyles}>
                {displayName}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  </header>
);

const headingStyles = { gridColumn: 2, marginTop: "2rem" };

export default ({ children, ...props }) => (
  <div>
    <Global
      styles={{
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0
        },
        html: {
          background: "#1b1f2a",
          fontFamily: "'Inter var', system-ui, sans-serif"
        }
      }}
    />
    <Helmet>
      <meta charSet="utf-8" />
      <title>Chris Biscardi's Digital Garden</title>
      <meta name="description" value="JAMStack, Serverless, MDX, and more" />
    </Helmet>
    <Header />
    {props.title && (
      <div css={{ width: "57ch", margin: "4rem auto" }}>
        <h1 css={{ color: "rgba(255, 255, 255, 0.86)" }}>{props.title}</h1>
      </div>
    )}
    <MDXProvider
      components={{
        wrapper: props => (
          <div
            css={{
              display: "grid",
              color: "rgba(255, 255, 255, 0.86)",
              gridTemplateColumns:
                "minmax(1.2rem, 1fr) minmax(auto, 57ch) minmax(1.2rem, 1fr)"
            }}
            {...props}
          />
        ),
        p: props => (
          <p
            css={{ gridColumn: 2, marginTop: "1rem", lineHeight: 1.75 }}
            {...props}
          />
        ),
        h1: props => <h1 css={headingStyles} {...props} />,
        h2: props => <h2 css={headingStyles} {...props} />,
        h3: props => <h3 css={headingStyles} {...props} />,
        h4: props => <h4 css={headingStyles} {...props} />,
        h5: props => <h5 css={headingStyles} {...props} />,
        h6: props => <h6 css={headingStyles} {...props} />
      }}
    >
      <div>{children}</div>
    </MDXProvider>
  </div>
);
