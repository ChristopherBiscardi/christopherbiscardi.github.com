/** @jsx jsx */
import React from "react";
import Layout from "gatsby-theme-blog/src/components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx, Styled } from "theme-ui";
import Highlight from "prism-react-renderer";

export default props => {
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
          gridTemplateColumns: ["1fr", "1fr 1fr", "1fr 1fr 1fr"]
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
    </Layout>
  );
};
