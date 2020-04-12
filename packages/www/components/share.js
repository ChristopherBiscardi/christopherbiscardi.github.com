/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { TwitterShareButton } from "react-share";

const Share = ({ url, title, twitterHandle }) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        transition: color 0.1s cubic-bezier(1, 0, 1, 0);
        &:hover div {
          background-position: 0%;
        }
        &:hover {
          color: #dd00f3;
        }
        margin-bottom: 6rem;
      `}
    >
      <div
        css={css`
          margin-right: 20px;
          flex-grow: 1;
          background: linear-gradient(
            124deg,
            #ff2400,
            #e81d1d,
            #e8b71d,
            #e3e81d,
            #1de840,
            #1ddde8,
            #2b1de8,
            #dd00f3,
            #dd00f3 50%,
            gray 50%
          );
          height: 1px;
          color: red;
          background-size: 200%;
          background-position: 100%;
          transition: background-position 0.1s ease-in;
        `}
      />
      <span
        css={{
          marginRight: "20px",
          fontSize: "70%",
          textTransform: "uppercase",
          lineHeight: 2.5
        }}
      >
        Share article
      </span>
      <TwitterShareButton
        url={url}
        title={title}
        via={twitterHandle.split("@").join("")}
      >
        Twitter
      </TwitterShareButton>
    </div>
  );
};

export default Share;
