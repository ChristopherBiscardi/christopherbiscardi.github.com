import React from "react";
import Post from "gatsby-theme-blog/src/components/post";
import Helmet from "react-helmet";
import slugify from "@sindresorhus/slugify";
import PostFooter from "../../components/post-footer";

export default props => {
  const newProps = props;
  newProps.data.post.date = "";

  return (
    <>
      <Post {...newProps} />
      <div css={{ maxWidth: "672px", margin: "auto" }}>
        <PostFooter
          previous={newProps.data.previous}
          next={newProps.data.next}
          title={newProps.data.post.title}
        />
      </div>
      <Helmet
        meta={[
          {
            name: `twitter:card`,
            content: "summary_large_image"
          },
          {
            name: `twitter:image`,
            content: `https://www.christopherbiscardi.com/blog-post-images/${slugify(
              props.data.post.title
            )}.png`
          },
          { name: `twitter:site`, content: `@chrisbiscardi` }
        ]}
      />
    </>
  );
};
