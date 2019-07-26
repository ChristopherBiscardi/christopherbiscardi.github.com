import React, { useContext } from "react";
import Header from "gatsby-theme-blog/src/components/header";
import { TagPageDataContext } from "../../components/tag-page-data-context";

export default props => {
  const { tag } = useContext(TagPageDataContext);
  const title = tag ? `${props.title} :: on ${tag}` : props.title;
  return <Header {...props} title={title} />;
};
