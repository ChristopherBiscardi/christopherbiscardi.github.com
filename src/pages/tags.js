import Helmet from "react-helmet";
import React, { Component } from "react";
import { graphql, Link } from "gatsby";

import { Heading } from "sens8";
import SiteLayout from "../site-layout";
import Img from "gatsby-image";

export default class TagsPage extends Component {
  render() {
    return (
      <SiteLayout>
        <Helmet>
          <title>Chris' Content Tags</title>
          <meta
            name="description"
            content="Posts and other content, organized by Tag"
          />
          <meta name="referrer" content="origin" />
        </Helmet>
        <div>
          <Img
            css={{ minHeight: "300px", zIndex: -1 }}
            fluid={this.props.data.headingImage.childImageSharp.fluid}
          />
          <section
            css={theme => ({
              position: "absolute",
              top: 0,
              width: "100%",
              alignItems: "center",
              //            background: theme.colors.raw.neutral[90],
              background: "none",
              display: "flex",
              flexDirection: "column",
              height: "40vh",
              justifyContent: "center",
              marginBottom: "1.5rem"
            })}
          >
            <Heading
              css={{
                textShadow: "2px 2px 1vw #1f2933",
                fontSize: "10vw",
                marginTop: "14vw"
              }}
              level={1}
            >
              Content Tags
            </Heading>
          </section>
        </div>
        <ul>
          {this.props.data.allMdx.byTag.map(({ tag }) => (
            <li>
              <Link
                to={`/tags/${tag}`}
                css={({ colors }) => ({
                  color: colors.text
                })}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </SiteLayout>
    );
  }
}

export const pageQuery = graphql`
  query TagsPageQuery {
    allMdx {
      byTag: group(field: frontmatter___tags) {
        tag: fieldValue
      }
    }
    headingImage: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "luca-zanon-26595-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
