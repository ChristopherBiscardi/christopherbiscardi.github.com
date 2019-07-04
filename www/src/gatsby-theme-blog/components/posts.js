import React from "react";
import Posts from "gatsby-theme-blog/src/components/posts";

export default props => (
  <Posts
    {...props}
    posts={props.posts.map(({ node }) => ({ node: { ...node, date: "" } }))}
  />
);
