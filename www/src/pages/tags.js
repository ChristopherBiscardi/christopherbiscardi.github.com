import React from "react";
import { graphql, Link } from "gatsby";
import { Styled } from "theme-ui";
import Layout from "gatsby-theme-blog/src/components/layout";

const numberOfPostsRequiredToBeFeatured = 3;
export default ({ location, ...props }) => {
  const tags = props.data.tags.group.filter(({ tag }) => tag !== "");
  const highTags = tags.filter(
    ({ totalCount }) => totalCount >= numberOfPostsRequiredToBeFeatured
  );
  const lowTags = tags.filter(
    ({ totalCount }) => totalCount < numberOfPostsRequiredToBeFeatured
  );
  return (
    <Layout location={location} title="Browse by Tags">
      <Styled.h1>Top Tags</Styled.h1>
      <ul
        css={{
          display: "grid",
          listStyleType: "none",
          gridTemplateColumns: "repeat(4, 1fr)",
          marginBottom: "4rem"
        }}
      >
        {highTags.map(({ tag }) => (
          <li>
            <Styled.a
              as={Link}
              to={`/tags/${tag}`}
              css={{
                display: "flex",
                boxSizing: "border-box",
                border: "1px solid transparent",
                padding: ".5rem",
                borderRadius: "3px",
                "&:hover": {
                  background: "rgba(255,255,255,.1)",
                  borderColor: "rgba(0,0,0,.2)"
                }
              }}
            >
              {tag}
            </Styled.a>
          </li>
        ))}
      </ul>
      <Styled.h3>All Tags</Styled.h3>
      <ul>
        {tags.map(({ tag }) => (
          <li>
            <Styled.a as={Link} to={`/tags/${tag}`}>
              {tag}
            </Styled.a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query TagsQuery {
    tags: allBlogPost {
      group(field: tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;
