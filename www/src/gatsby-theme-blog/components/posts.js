import React from "react";
import Posts from "gatsby-theme-blog/src/components/posts";
import SEO from "../../seo";
// import postsImage from "../../assets/posts-opengraph-image.png";

export default props => (
  <>
    <Posts
      {...props}
      posts={props.posts.map(({ node }) => ({ node: { ...node, date: "" } }))}
    />
    {/* <SEO image={}/> */}
  </>
);
