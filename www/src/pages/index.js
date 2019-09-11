import React from "react";
// import Layout from "gatsby-theme-blog/src/components/layout";
// import { Styled } from "theme-ui";
import Layout from "../components/layout";
const maxWidth = "800px";

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
    <Layout>
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
    </Layout>
  );
};
