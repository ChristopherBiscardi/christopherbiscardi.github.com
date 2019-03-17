import React, { Component } from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import SEO from "./seo";
import { Heading, Text } from "sens8";
import { useLayers, useTextColor } from "@sens8/tokens";
import ResponsiveEmbed from "react-responsive-embed";

import SiteLayout from "./site-layout";

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
// TODO: Use a custom form and lambdas on netlify to handle convertkit
// form submissions
class ConvertKitForm extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div
        css={{
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "center",
          "& > form": {
            flex: 1,
            border: "none"
          }
        }}
      >
        <script
          async
          data-uid="a4c7df1847"
          src="https://f.convertkit.com/a4c7df1847/0207b2beea.js"
        />
      </div>
    );
  }
}

export default class BlogPost extends Component {
  render() {
    const { data } = this.props;
    let src = undefined;
    if (data.mdx.fields.featuredImage) {
      src = data.mdx.fields.featuredImage.childImageSharp.fixed.src;
    } else {
      src = data.ogImage.src;
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
        <Hero title={data.mdx.frontmatter.title} />

        {data.mdx.frontmatter.egghead && (
          <ResponsiveEmbed
            css={{ maxWidth: "38rem" }}
            allowFullScreen
            src={data.mdx.frontmatter.egghead}
          />
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
          <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
        </div>
        <ConvertKitForm />

        <hr
          css={{
            borderColor: "white",
            borderTop: `1px solid black`,
            paddingTop: "1px"
          }}
        />
        {data.webmentions && <WebMentions mentions={data.webmentions} />}
      </SiteLayout>
    );
  }
}

const WebMentions = props => {
  const layers = useLayers();
  const textColor = useTextColor();
  return (
    <div
      css={{
        margin: "auto",
        marginTop: "1.5rem",
        maxWidth: "400px"
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
              maxWidth: "500px",
              padding: ".5rem",
              borderBottom: `1px solid ${layers[2]}`,
              borderRadius: `3px`,
              background: layers[1]
            }}
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
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
      excerpt
      fields {
        featuredImage {
          childImageSharp {
            fixed {
              src
            }
          }
        }
      }
      frontmatter {
        title
        egghead
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
