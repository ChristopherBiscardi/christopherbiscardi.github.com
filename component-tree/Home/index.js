import React, { Component, PropTypes } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Hero from "../Hero";
import PostCard from "../../components/PostCard";
import styles from "./Home.css";
const { bool, string } = PropTypes;
import Helmet from "react-helmet";
import { css } from "glamor";

const gStickyWrapper = css({
  display: "flex",
  padding: "1rem 2rem",
  backgroundColor: "#FAFAFA",
  color: "#010d13",
  "@media only screen and (max-width: 480px)": {
    flexFlow: "column nowrap"
  }
});
const gPostsWrapper = css({
  padding: "0 2rem",
  backgroundColor: "#FAFAFA"
});
const gPosts = css({
  label: "gPosts",
  "@media only screen and (min-width: 800px)": {
    display: "grid",
    gridTemplateColumns: "1fr .5fr .5fr 1fr",
    gridColumnGap: "1rem",
    gridRowGap: "1rem"
  },
  "@media only screen and (min-width: 1440px)": {
    padding: "1rem 0",
    lostCenter: "1440px"
  }
});
const gStickyInnerWrapper = css({
  flexFlow: "row wrap",
  "@media (width >= 1440px)": {
    lostCenter: "1440px"
  }
});

const gReadMore = css({
  color: "#0B95E1",
  fontSize: "0.8rem",
  margin: "0"
});

const gStickyMeta = css({
  lostColumn: "2/10 2",
  "@media only screen and (max-width: 480px)": {
    lostColumn: "1/1 1"
  }
});

const gStickyContent = css({
  lostColumn: "8/10 2",
  "@media only screen and (max-width: 480px)": {
    lostColumn: "1/1 1"
  }
});

const gFeatured = css({
  textAlign: "end",
  marginBottom: "0",
  color: "#0B95E1",
  "@media only screen and (max-width: 480px)": {
    fontWeight: "bold"
  }
});

class StickyComponent extends Component {
  render() {
    const {
      title,
      excerpt,
      url
    } = this.props.sticky.attributes;

    return (
      <Link to={url}>
        <div {...gStickyWrapper}>
          <div {...gStickyInnerWrapper}>

            <div {...gStickyMeta}>
              <p {...gFeatured}>Featured</p>
            </div>

            <div {...gStickyContent}>
              <h3>{title}</h3>
              <p>{excerpt}</p>
              <p {...gReadMore}>Read more...</p>
            </div>

          </div>
        </div>
      </Link>
    );
  }
}

const gPost = css({
  label: 'gPost',
  display: 'flex',
  gridColumnStart: "span 2",
  "@media only screen and (min-width: 480px)": {
    ":nth-child(3)": {
      gridColumnStart: "span 1"
    },
    ":nth-child(5)": {
      gridColumnStart: "span 1"
    }
  }
});

export class HomeComponent extends Component {
  render() {
    const {
      root,
      loading
    } = this.props.data;
    if (loading) {
      return <div>HomeLoading</div>;
    }
    return (
      <div>
        <Helmet
          title="Chris Biscardi"
          meta={[
            {
              property: "og:url",
              content: __DOMAIN__
            },
            {
              property: "og:description",
              content: "Chris Biscardi builds products for startups using functional programming."
            },
            {
              property: "og:image",
              content: __DOMAIN__ + require("../Hero/default-bg.jpeg")
            }
          ]}
        />
        <Hero />
        {root.sticky && <StickyComponent sticky={root.sticky} />}
        <div {...gPostsWrapper}>
          <div {...gPosts}>
            {root.posts &&
              root.posts.edges.map(({ node }) =>
              (
                <div {...gPost} key={node.attributes.slug}>
                  <PostCard post={node} />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const Query = gql`query HomeQuery {
  root {
    posts(first: 5) {
      pageInfo { hasNextPage }
      edges {
        node {
          ...PostFragment
        }
      }
    }
    sticky: post(slug: "building-a-docker-registry") {
      attributes { title, url, excerpt }
    }
  }
}
${PostCard.fragments.post}
`;

export default graphql(Query, {
  options: ({ params }) => {
    return {
      variables: {}
    };
  }
})(HomeComponent);
