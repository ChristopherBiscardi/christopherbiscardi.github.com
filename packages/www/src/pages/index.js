/* @jsx jsx */
// import React from "react";
import { Fragment } from "preact";
import { jsx } from "@emotion/preact-core";
// impprt {h} from 'preact'
// import Layout from "gatsby-theme-blog/src/components/layout";
// import { Styled } from "theme-ui";
// import Layout from "../components/layout";
import Icon, { iconFromList } from "../components/small-icons/index.js";
// import SEO from "../components/seo/index.js";
// import NyanCat from "../components/nyan-cat";
import SocialButton from "../components/social-button/index.js";
// import ConvertKitForm from "../components/convertkit-form";
const maxWidth = "800px";

console.log("SocialButton", SocialButton);

const Link = props => <a href={props.to} {...props} />;
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
        {/* <Icon icon={logo} /> */}
        <span css={{ marginLeft: "10px" }}>{children}</span>
      </Component>
    </li>
  );
};

export default props => {
  const data = { highlightedLessons: [], recentPosts: [] };
  return (
    <Fragment>
      {/* <SEO title="Chris Biscardi" /> */}
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
          I'm an independent consultant that works with startups built on OSS.
          Here I write about JAMStack, Serverless, MDX, and more. This site is
          built with ESModules, Snowpack, and MDX.
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
              Twitter
            </SocialButton>
          </li>
          <li>
            <SocialButton
              href="https://www.twitch.tv/chrisbiscardi"
              icon="twitch"
            >
              Twitch
            </SocialButton>
          </li>
          <li>
            <SocialButton
              href="https://www.youtube.com/channel/UCiSIL42pQRpc-8JNiYDFyzQ"
              icon="youtube"
            >
              YouTube
            </SocialButton>
          </li>
          <li>
            <SocialButton
              href="https://github.com/ChristopherBiscardi"
              icon="github"
            >
              GitHub
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
        {data.recentPosts.map(({ id, title, slug, tags }) => (
          <ListItem logo={iconFromList(tags)} to={slug} key={id}>
            {title}
          </ListItem>
        ))}
      </List>
      <div css={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <NyanCat css={{ height: "37px" }} /> */}
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
        {data.highlightedLessons.map(
          ({ id, title, httpUrl: slug, primaryTag }) => (
            <ListItem
              logo={iconFromList(primaryTag ? [primaryTag.name] : [])}
              to={slug}
              key={id}
            >
              {title}
            </ListItem>
          )
        )}
      </List>
      {/* <ConvertKitForm /> */}
    </Fragment>
  );
};

// export const query = graphql`
//   query HomePageQuery {
//     recentPosts: allSectorMdx(
//       sort: { fields: [createdAt], order: DESC }
//       limit: 5
//     ) {
//       nodes {
//         id
//         title
//         # tags
//         slug
//       }
//     }
//     highlightedLessons: allEggheadLesson(
//       filter: { state: { eq: "published" } }
//       sort: { fields: publishedAt, order: DESC }
//       limit: 5
//     ) {
//       nodes {
//         id
//         title
//         httpUrl
//         primaryTag {
//           name
//         }
//       }
//     }
//   }
// `;
