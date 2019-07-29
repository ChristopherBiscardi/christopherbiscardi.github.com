import React from "react";
import Post from "gatsby-theme-blog/src/components/post";
import Helmet from "react-helmet";
import slugify from "@sindresorhus/slugify";

export default props => {
  const newProps = props;
  newProps.data.post.date = "";
  return (
    <>
      <Post {...newProps} />
      <Helmet
        meta={[
          {
            name: `twitter:card`,
            content: "summary_large_image"
          },
          {
            name: `twitter:image`,
            content: `https://www.christopherbiscardi.com/rainbow-og-images/${slugify(
              props.data.post.title
            )}.png`
          }
        ]}
      />
    </>
  );
};
