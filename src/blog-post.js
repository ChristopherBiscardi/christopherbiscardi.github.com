import React, { Component } from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/tag";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import SEO from "./seo";
import { Heading, Text } from "sens8";

import SiteLayout from "./site-layout";

export default class BlogPost extends Component {
  render() {
    const { data } = this.props;
    const imageRoot = data.mdx.frontmatter.featuredImage;
    let src = undefined;
    if (imageRoot) {
      src = imageRoot.childImageSharp.fixed.src;
    }
    return (
      <SiteLayout
        sidebar={<aside css={{ minWidth: "200px" }}>some stuff</aside>}
      >
        <SEO
          description={data.mdx.excerpt}
          title={data.mdx.frontmatter.title}
          image={src}
        />
        <div
          css={theme => ({
            display: "flex",
            background: theme.colors.raw.neutral[90],
            height: "30vh",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem"
          })}
        >
          <Heading level={1}>{data.mdx.frontmatter.title}</Heading>
        </div>
        <div
          data-id="wrapper"
          css={{
            "& > div > :not(div)": {
              maxWidth: "38rem",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "0 1rem"
            },
            "& code": {
              maxWidth: "38rem"
            }
          }}
        >
          <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
        </div>
        <script
          async
          data-uid="a4c7df1847"
          src="https://f.convertkit.com/a4c7df1847/0207b2beea.js"
        />

        <hr
          css={({ colors }) => ({
            borderColor: colors.raw.neutral[90],
            borderTop: `1px solid ${colors.raw.neutral[100]}`,
            paddingTop: "1px"
          })}
        />
        {data.webmentions && (
          <div
            css={({ colors }) => ({
              margin: "auto",
              marginTop: "1.5rem",
              maxWidth: "400px"
            })}
          >
            <Heading>Web Mentions</Heading>
            {data.webmentions.edges.map(({ node }) => {
              const { content, author } = node;
              return (
                <div
                  key={node.id}
                  css={({ colors }) => ({
                    display: "flex",
                    maxWidth: "500px",
                    padding: ".5rem",
                    borderBottom: `1px solid ${colors.raw.neutral[80]}`,
                    borderRadius: `3px`,
                    background: colors.raw.neutral[70]
                  })}
                >
                  <img
                    css={{
                      borderRadius: "100%",
                      width: "4rem",
                      height: "4rem"
                    }}
                    src={author.photo}
                  />
                  <div css={{ flex: 1, marginLeft: ".5rem" }}>
                    <a href={author.url} css={{ textDecoration: "none" }}>
                      <Heading level={4}>{author.name}</Heading>
                    </a>
                    {content.html ? (
                      <div
                        css={({ colors }) => ({
                          color: colors.text,
                          "& a": {
                            color: "#ff5e99"
                          }
                        })}
                        dangerouslySetInnerHTML={{ __html: content.html }}
                      />
                    ) : (
                      <Text css={{ minWidth: 0 }}>{content.text}</Text>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SiteLayout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!, $webmentionMatchURL: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
      excerpt
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
    }
    webmentions: allWebMentionEntry(
      filter: {
        wmProperty: { nin: ["like-of", "repost-of"] }
        wmTarget: { eq: $webmentionMatchURL }
      }
    ) {
      edges {
        node {
          id
          url
          content {
            html
            text
          }
          author {
            type
            name
            photo
            url
          }
        }
      }
    }
  }
`;
