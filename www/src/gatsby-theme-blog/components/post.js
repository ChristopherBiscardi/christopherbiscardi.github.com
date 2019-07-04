import React from "react";
import Post from "gatsby-theme-blog/src/components/post";

export default props => {
  const newProps = props;
  newProps.data.post.date = "";
  return <Post {...newProps} />;
};
