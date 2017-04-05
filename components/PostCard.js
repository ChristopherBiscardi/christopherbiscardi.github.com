import React, { Component, PropTypes } from "react";
const { bool, string } = PropTypes;
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { propType } from "graphql-anywhere";
import { Link } from "react-router-dom";
import { css } from "glamor";

const gPost = css({
  marginBottom: "2rem",
  padding: "1rem",
  backgroundColor: "white",
  borderRadius: "3px",
  boxShadow: "0 1px 4px rgba(0,0,0,.04)",
  border: "1px solid rgba(0,0,0,.09)",
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  /*
   Below prevents words that are continuous and longer than the
   container from overflowing
  */
  wordWrap: "break-word",
  minWidth: 0
});

const gPostHeader = css({
  margin: "-1rem",
  borderTopLeftRadius: "3px",
  borderTopRightRadius: "3px",
  // Because percent padding is relative to width, the "height" will be 2/5 of the width.
  height: 0,
  paddingBottom: "40%"
});

const blueprintBackground = css({
  // Originally from http://lea.verou.me/css3patterns/#blueprint-grid
  backgroundColor: "#ecf8ff",
  backgroundImage: `
linear-gradient(white 2px, transparent 2px),
linear-gradient(90deg, white 2px, transparent 2px),
linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)
`,
  backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
  backgroundPosition: "-2px -2px, -2px -2px, -1px -1px, -1px -1px"
});

const gBlueprintHeader = css(blueprintBackground, gPostHeader);

const gHeading = css({
  label: 'heading',
  color: "#373a3c",
  marginBottom: 0
});

const gMeta = css({
  fontSize: "0.8rem"
});

const gReadMore = css({
  color: "#AEAEAE",
  fontSize: "0.8rem"
});

const gExcerpt = css({
  marginBottom: ".5rem"
});

class PostCard extends Component {
  static fragments = {
    post: gql`
      fragment PostFragment on BlogPost {
        body
        attributes {
          title
          slug
          url
          excerpt
          updatedAt
          timeToRead
          headerImage
        }
      }
    `
  };
  render() {
    const {
      title,
      updatedAt,
      excerpt,
      featuredImage,
      timeToRead,
      url,
      headerImage
    } = this.props.post.attributes;

    var maybeHeaderImage = <div {...gBlueprintHeader} />;
    if (headerImage) {
      maybeHeaderImage = (
        <div
          {...css(
            {
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${headerImage})`
            },
            gPostHeader
          )}
        />
      );
    }

    return (
      <div {...gPost}>
        {maybeHeaderImage}
        <div>
          <Link to={url}><h4 {...gHeading}>{title}</h4></Link>
          <span {...gMeta}>
            {updatedAt} • {timeToRead} minute read{" "}
          </span>
        </div>
        <p {...gExcerpt}>{excerpt}</p>
        <Link to={url} {...gReadMore}>Read more...</Link>
      </div>
    );
  }
}

PostCard.propTypes = {
  post: propType(PostCard.fragments.post).isRequired
};

export default PostCard;
