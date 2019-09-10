import React from "react";
import { Link } from "gatsby";
import Layout from "gatsby-theme-blog/src/components/layout";
// import { Styled } from "theme-ui";
import Logo from "../components/logos/logo-full.svg";

const nav = [
  { displayName: "Posts", url: "/post" },
  { displayName: "Notes", url: "/notes" },
  { displayName: "Dev Tips", url: "/devtips" },
  { displayName: "Tags", url: "/tags" },
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
const maxWidth = "800px";
const Header = props => (
  <div
    css={{
      display: "flex",
      height: "75px",
      maxWidth,
      margin: "auto",
      marginTop: "30px"
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
          justifyContent: "flex-end"
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
            <li key={displayName + url} css={{ marginLeft: "2rem" }}>
              {child}
            </li>
          );
        })}
      </ul>
    </nav>
  </div>
);

const socialStyles = {
  twitter: { backgroundColor: "#00aced", color: "#eef1f7" },
  twitch: { backgroundColor: "#6441a5", color: "#eef1f7" },
  youtube: { backgroundColor: "#c4302b", color: "#eef1f7" },
  github: { backgroundColor: "#eef1f7", color: "black" }
};
const SocialButton = ({ href, icon, children }) => (
  <a
    href={href}
    css={[
      {
        padding: " .25rem .75rem",
        borderRadius: "3px",
        textDecoration: "none",
        fontSize: "1rem"
      },
      socialStyles[icon]
    ]}
  >
    {children}
  </a>
);
export default props => {
  return (
    <div>
      <Header />
      <div css={{ maxWidth, margin: "auto", marginTop: "75px" }}>
        <h1 css={{ fontSize: "3rem", marginBottom: ".3em" }}>
          Hey, I&rsquo;m Chris
        </h1>
        <p
          css={{
            fontSize: "1.2rem",
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: "32em"
          }}
        >
          Did he just throw my cat out of the window? So you two dig up, dig up
          dinosaurs? Life finds a way. God creates dinosaurs. God destroys
          dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.
          Must go faster. So you two dig up, dig up dinosaurs?
        </p>
        <ul
          css={{
            margin: 0,
            marginTop: "3rem",
            padding: 0,
            listStyleType: "none",
            display: "flex",
            "& > *": {
              marginRight: ".5rem"
            }
          }}
        >
          <li>
            <SocialButton
              href="https://twitter.com/chrisbiscardi"
              icon="twitter"
            >
              Follow
            </SocialButton>
          </li>
          <li>
            <SocialButton
              href="https://www.twitch.tv/chrisbiscardi"
              icon="twitch"
            >
              Follow
            </SocialButton>
          </li>
          <li>
            <SocialButton
              href="https://www.youtube.com/channel/UCiSIL42pQRpc-8JNiYDFyzQ"
              icon="youtube"
            >
              Subscribe
            </SocialButton>
          </li>
          <li>
            <SocialButton
              href="https://github.com/ChristopherBiscardi"
              icon="github"
            >
              Follow
            </SocialButton>
          </li>
        </ul>
      </div>
    </div>
  );
  return (
    <>
      <Layout location={props.location} title="Chris Biscardi"></Layout>
    </>
  );
};
