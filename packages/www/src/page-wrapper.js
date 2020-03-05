/** @jsx jsx */
import { jsx, Global } from "@emotion/preact-core";
import Logo from "./components/logos/logo-full";
import Helmet from "react-helmet";

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
    <Helmet title="Chris Biscardi" />
    <Header />
    <div>{children}</div>
  </div>
);
