import React from "react";
// import Layout from "gatsby-theme-blog/src/components/layout";
// import { Styled } from "theme-ui";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import Icon, { iconFromList } from "../components/small-icons";
import SEO from "../seo";
import NyanCat from "../components/nyan-cat";
import { keyframes } from "@emotion/core";
const maxWidth = "800px";

const Input = ({ label, ...props }) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box"
    }}
  >
    <label css={{ marginBottom: "12px", fontSize: "1rem" }}>{label}</label>
    <input
      type="text"
      css={{
        boxSizing: "border-box",
        height: "48px",
        border: "2px solid #2B3748",
        borderRadius: "6px",
        boxShadow: `inset 0 0 8px  rgba(0,0,0,0.1),
            0 0 16px rgba(0,0,0,0.1)`,
        padding: `0 8px`,
        background: `transparent`,
        margin: `0`,
        fontSize: "1.5rem",
        color: "rgba(255,255,255,0.86)"
      }}
    />
  </div>
);

const gradientAnimation = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
`;
const RainbowBorder = ({ children, ...props }) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "90%",
      margin: "auto",
      maxWidth,

      position: "relative",
      padding: "2rem",
      boxSizing: "border-box",

      background: "#1b1f2a",
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "1rem",

      "&:before": {
        animation: `${gradientAnimation} 30s ease infinite`,
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        margin: "-1px",
        // background: 'linear-gradient(to right, red, orange)',
        backgroundColor: "#ff1493",
        background:
          "linear-gradient(319deg, #ff1493 0%, #0000ff 37%, #ff8c00 100%)",

        borderRadius: "1rem"
      }
    }}
  >
    {children}
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

const List = ({ title, subtitle, secondary, ...props }) => (
  <div css={{ maxWidth, margin: "auto", marginBottom: "3rem" }}>
    <div
      css={{
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <h2 css={{ margin: 0 }}>{title}</h2>
      {secondary}
    </div>
    <ul css={{ listStyleType: "none", margin: 0, padding: 0 }}>
      {props.children}
    </ul>
  </div>
);

const ListItem = ({ to, logo, children }) => {
  const Component = to.startsWith("https") ? "a" : Link;
  return (
    <li>
      <Component
        to={to}
        href={to}
        css={{
          color: "rgba(255,255,255,0.86)",
          display: "flex",
          borderRadius: "8px",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "#2D3747"
          },
          padding: "1rem",
          margin: "0 -1rem"
        }}
      >
        <Icon icon={logo} />
        <span css={{ marginLeft: "10px" }}>{children}</span>
      </Component>
    </li>
  );
};

export default ({ data, ...props }) => {
  return (
    <Layout>
      <SEO title="Chris Biscardi" />
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
          Do you want to know how to build and sell Gatsby themes? To build
          beautiful interactive experiences with MDX? Automate CI/CD with GitHub
          Actions? Here I talk about this and more.
        </p>
        <ul
          css={{
            margin: 0,
            marginTop: "3rem",
            marginBottom: "7rem",
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
      <List
        title="Latest Posts"
        secondary={
          <Link
            to="/post"
            css={{
              color: "rgba(255,255,255,0.86)",
              textDecoration: "none",
              // margin is to align baseline with heading
              marginBottom: "2px",
              alignSelf: "flex-end",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
          >
            all posts
          </Link>
        }
      >
        {data.recentPosts.nodes.map(({ id, title, slug, tags }) => (
          <ListItem logo={iconFromList(tags)} to={slug} key={id}>
            {title}
          </ListItem>
        ))}
      </List>
      <div css={{ display: "flex", justifyContent: "flex-end" }}>
        <NyanCat css={{ height: "37px" }} />
      </div>
      <List
        title="Latest Lessons"
        subtitle="egghead.io"
        secondary={
          <a
            href="https://egghead.io/instructors/chris-biscardi"
            css={{
              color: "rgba(255,255,255,0.86)",
              textDecoration: "none",
              // margin is to align baseline with heading
              marginBottom: "2px",
              alignSelf: "flex-end",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
          >
            all lessons
          </a>
        }
      >
        {data.highlightedLessons.nodes.map(
          ({ id, title, httpUrl: slug, primaryTag }) => (
            <ListItem logo={iconFromList([primaryTag.name])} to={slug} key={id}>
              {title}
            </ListItem>
          )
        )}
      </List>
      <RainbowBorder>
        <h2 css={{ margin: 0, marginBottom: "2rem" }}>Join the Newsletter</h2>
        <p css={{ margin: 0, marginBottom: "2rem" }}>
          What do they got in there? King Kong? You're a very talented young
          man, with your own clever thoughts and ideas. Do you need a manager?
          Is this my espresso machine? Wh-what is-h-how did you get my espresso
          machine? Life finds a way.{" "}
        </p>
        <div css={{ display: "flex", justifyContent: "space-between" }}>
          <Input label="Preferred name" />
          <Input label="Email address" />
          <button
            css={{
              boxSizing: "border-box",
              height: "48px",
              width: "140px",
              borderRadius: "6px",
              backgroundColor: "#28374A",
              alignSelf: "flex-end",
              color: "rgba(255,255,255,0.86)",
              fontWeight: 600,
              border: "2px solid #2B3748"
            }}
          >
            Subscribe
          </button>
        </div>
      </RainbowBorder>
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery {
    recentPosts: allBlogPost(sort: { fields: [date], order: DESC }, limit: 5) {
      nodes {
        id
        title
        tags
        slug
      }
    }
    highlightedLessons: allEggheadLesson(
      filter: { state: { eq: "published" } }
      sort: { fields: publishedAt, order: DESC }
      limit: 5
    ) {
      nodes {
        id
        title
        httpUrl
        primaryTag {
          name
        }
      }
    }
  }
`;
