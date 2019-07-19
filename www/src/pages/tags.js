import React from "react";
import { graphql, Link } from "gatsby";

export default props => {
  return (
    <div>
      <h1>Browse by Tags</h1>
      <ul>
        {props.data.tags.group
          .filter(({ tag }) => tag !== "")
          .map(({ tag }) => (
            <li>
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </li>
          ))}
      </ul>
    </div>
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
