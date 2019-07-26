import React from "react";
import { graphql, Link } from "gatsby";
import { Styled } from "theme-ui";
import Layout from "gatsby-theme-blog/src/components/layout";

export default ({ location, ...props }) => {
  return (
    <Layout location={location} title="Browse by Tags">
      <ul>
        {props.data.tags.group
          .filter(({ tag }) => tag !== "")
          .map(({ tag }) => (
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
      }
    }
  }
`;
