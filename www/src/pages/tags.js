import Helmet from "react-helmet";
import React, { Component } from "react";
import { graphql, Link as GLink } from "gatsby";

import { Heading, Link } from "sens8";
import { useTextColor, useLayers } from "@sens8/tokens";
import SiteLayout from "../site-layout";

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
          <section
            css={theme => ({
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
        <ul
          css={{
            display: "grid",
            gridTemplateColumns: `1fr 1fr 1fr 1fr 1fr 1fr`,
            listStyleType: "none"
          }}
        >
          {this.props.data.allBlogPost.byTag.map(({ tag }) => (
            <TagItem tag={tag} />
          ))}
        </ul>
      </SiteLayout>
    );
  }
}

const TagItem = ({ tag }) => {
  const textColor = useTextColor();
  const backgroundColor = useLayers(1);
  return (
    <li
      css={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Link
        as={GLink}
        to={`/tags/${tag}`}
        css={{ padding: "1rem", backgroundColor }}
      >
        <Heading level={4} css={{ margin: 0 }}>
          {tag}
        </Heading>
      </Link>
    </li>
  );
};
export const pageQuery = graphql`
  query TagsPageQuery {
    allBlogPost: allMdxBlogPost {
      byTag: group(field: tags) {
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
