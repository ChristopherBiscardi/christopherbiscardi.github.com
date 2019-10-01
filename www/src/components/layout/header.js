import React from "react";
import { Link } from "gatsby";
import Logo from "../logos/logo-full.svg";

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
          let child = null;
          if (/^https/.test(url)) {
            child = (
              <a href={url} css={navLinkStyles}>
                {displayName}
              </a>
            );
          } else {
            child = (
              <Link to={url} css={navLinkStyles}>
                {displayName}
              </Link>
            );
          }

          return (
            <li
              key={displayName + url}
              css={{ marginLeft: "2rem", marginTop: "18px" }}
            >
              {child}
            </li>
          );
        })}
      </ul>
    </nav>
  </header>
);

export default Header;
