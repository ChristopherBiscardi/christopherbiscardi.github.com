import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { graphql } from "gatsby";

export default props => (
  <div>
    <ul
      css={{
        listStyleType: "none",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
      }}
    >
      {props.data.allFaunaDevTipResult.nodes.map(({ id, tweetId }) => (
        <li key={id}>
          <TwitterTweetEmbed tweetId={tweetId} />
        </li>
      ))}
    </ul>
  </div>
);

export const query = graphql`
  {
    allFaunaDevTipResult {
      nodes {
        id
        tweetId
      }
    }
  }
`;
