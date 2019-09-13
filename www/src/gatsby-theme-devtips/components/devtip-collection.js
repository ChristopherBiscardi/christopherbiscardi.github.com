/** @jsx jsx */
import React from "react";
import Layout from "gatsby-theme-blog/src/components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx, Styled } from "theme-ui";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import slugify from "@sindresorhus/slugify";

export default props => {
  const data = useStaticQuery(graphql`
    query DevTipsSiteUrlQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
  return (
    <Layout
      location={props.location}
      title={`DevTips -- ${props.data.devTipsCollection.name}`}
    >
      <blockquote>{props.data.devTipsCollection.description}</blockquote>
      <div
        sx={{
          display: "grid",
          gridGap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(378px, 1fr))"
        }}
      >
        {props.data.allDevTip.nodes.map(({ id, title, tweet, body }) => (
          <article
            key={id}
            css={{
              maxWidth: 378
            }}
          >
            <Styled.h2>{title}</Styled.h2>
            <div
              sx={{
                padding: 0,
                // border: "1px solid black",
                borderRadius: "3px",
                background: "rgba(0,0,0,.2)"
              }}
            >
              <Styled.p sx={{ padding: "1rem", paddingBottom: 0 }}>
                {tweet}
              </Styled.p>
              <MDXRenderer>{body}</MDXRenderer>
            </div>
          </article>
        ))}
      </div>
      <Helmet
        meta={[
          {
            name: `twitter:card`,
            content: "summary_large_image"
          },
          {
            name: `twitter:image`,
            content: `${
              data.site.siteMetadata.siteUrl
            }opengraph-images/tags/${slugify(
              props.data.devTipsCollection.name
            )}.png`
          }
        ]}
      />
    </Layout>
  );
};
