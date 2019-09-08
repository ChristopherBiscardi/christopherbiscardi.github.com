import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const testimonials = [
  "https://twitter.com/ReactPodcast/status/1169588488540278790",
  "https://twitter.com/JoshWComeau/status/1047610443433357312",
  "https://twitter.com/monasticpanic/status/1031723353449607170",
  "https://twitter.com/swyx/status/1169712009841172480",
  "https://twitter.com/4lpine/status/1078394539772006401",
  "https://twitter.com/DavidWells/status/1150529990468857858",
  "https://twitter.com/jlengstorf/status/1078793491868614656",
  "https://twitter.com/gill_kyle/status/1147206215014871041",
  "https://twitter.com/geddski/status/1077282525913858048",
  "https://twitter.com/jlengstorf/status/1028321414690947072",
  "https://twitter.com/vadimdemedes/status/1170501148383432704",
  "https://twitter.com/alley__oops/status/1154419975404343297",
  "https://twitter.com/wesbos/status/1081042701443842049",
  "https://twitter.com/evangoer/status/1041186784162414593"
].map(tweet => tweet.match(/\/(\d*$)\/?/)[1]);

export default props => (
  <div>
    <p>
      note: this is just a page of tweets related to past work I've done. It
      does not imply official endorsement, etc from anyone.
    </p>
    <ul css={{ listStyleType: "none", display: "flex", flexWrap: "wrap" }}>
      {testimonials.map(tweet => (
        <li css={{ marginRight: "1rem" }}>
          <TwitterTweetEmbed tweetId={tweet} />
        </li>
      ))}
    </ul>
  </div>
);
