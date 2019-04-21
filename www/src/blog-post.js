import React, { Component } from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import SEO from "./seo";
import { Heading, Text } from "sens8";
import { useLayers, useTextColor, useLinkColor } from "@sens8/tokens";
import { useMedia } from "react-use";

import ResponsiveEmbed from "react-responsive-embed";
import ConvertKitForm from "./components/convertkit-form";

import SiteLayout from "./site-layout";

const ConvertKitFooterish = ({ children, ...props }) => {
  const layers = useLayers();
  const borderColor = useLinkColor();
  return (
    <div
      css={{
        background: layers[1],
        marginTop: "50px",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        marginBottom: "1.5rem"
      }}
    >
      <div
        css={{
          maxWidth: "36em",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gridGap: "1rem"
        }}
      >
        <div
          css={{
            maxWidth: "200px",
            background: layers[2],
            padding: "1rem",
            borderRadius: "3px",
            border: `1px solid ${borderColor}`,
            transform: "translateY(-50px)"
          }}
        >
          <ConvertKitForm />
        </div>
        {children ? (
          children
        ) : (
          <Text>
            My newsletter is where you'll find exclusive content from me. I
            write about technology, startups, and why you shouldn't call
            yourself a junior engineer
          </Text>
        )}
      </div>
    </div>
  );
};

const Hero = props => {
  const backgroundColor = useLayers(1);
  return (
    <div
      css={{
        display: "flex",
        background: backgroundColor,
        height: "30vh",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.5rem"
      }}
    >
      <Heading level={1}>{props.title}</Heading>
    </div>
  );
};

export default class BlogPost extends Component {
  render() {
    const { data } = this.props;
    let src = undefined;
    if (data.blogPost.parent.fields.featuredImage) {
      src = data.blogPost.parent.fields.featuredImage.childImageSharp.fixed.src;
    } else {
      src = data.ogImage.src;
    }
    return (
      <SiteLayout
        sidebar={<aside css={{ minWidth: "200px" }}>some stuff</aside>}
      >
        <SEO
          description={data.blogPost.excerpt}
          title={data.blogPost.title}
          image={src}
        />
        <Hero title={data.blogPost.title} />
        {data.blogPost.isNewsletter && (
          <ConvertKitFooterish>
            <Text>
              This post is an archive from my newsletter. Sign up to receive
              content like this first, before I edit and release it to the
              public.
            </Text>
          </ConvertKitFooterish>
        )}
        {data.blogPost.egghead && (
          <ResponsiveEmbed allowFullScreen src={data.blogPost.egghead} />
        )}

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
          <MDXRenderer>{data.blogPost.body}</MDXRenderer>
        </div>
        <ConvertKitFooterish />

        {data.webmentions && <WebMentions mentions={data.webmentions} />}
      </SiteLayout>
    );
  }
}

const WebMentions = props => {
  const layers = useLayers();
  const textColor = useTextColor();
  const isWide = useMedia("(min-width: 480px)");
  return (
    <div
      css={{
        margin: "auto",
        marginTop: "1.5rem",
        padding: "0 1rem",
        gridGap: "1rem",
        display: "grid",
        gridTemplateColumns: isWide ? "1fr 1fr 1fr" : "1fr"
      }}
    >
      <Heading>Web Mentions</Heading>
      {props.mentions.edges.map(({ node }) => {
        const { content, author } = node;
        return (
          <div
            key={node.id}
            css={{
              display: "flex",

              padding: ".5rem",
              border: `1px solid ${layers[2]}`,
              borderRadius: `3px`,
              background: layers[1]
            }}
          >
            <img
              alt="Author"
              css={{
                borderRadius: "100%",
                width: "49px",
                height: "49px"
              }}
              src={author.photo}
            />
            <div css={{ flex: 1, marginLeft: ".5rem" }}>
              <a href={author.url} css={{ textDecoration: "none" }}>
                <Heading level={4}>{author.name}</Heading>
              </a>
              {content.html ? (
                <div
                  css={{
                    color: textColor,
                    "& a": {
                      color: "#ff5e99"
                    }
                  }}
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
  );
};

export const pageQuery = graphql`
  query($id: String!, $webmentionMatchURL: String!, $title: String) {
    blogPost(id: { eq: $id }) {
      id
      title
      egghead
      isNewsletter
      body
      excerpt
      ... on MdxBlogPost {
        parent {
          ... on Mdx {
            fields {
              featuredImage {
                childImageSharp {
                  fixed {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
    ogImage {
      src(text: $title)
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
