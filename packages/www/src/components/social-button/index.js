import React from "react";

const socialStyles = {
  twitter: { backgroundColor: "#00aced", color: "#eef1f7" },
  twitch: { backgroundColor: "#6441a5", color: "#eef1f7" },
  youtube: { backgroundColor: "#c4302b", color: "#eef1f7" },
  github: { backgroundColor: "#eef1f7", color: "black" }
};
const socialIcons = {
  twitter: require("./twitter.svg").default,
  twitch: require("./twitch.svg").default,
  youtube: require("./youtube.svg").default,
  github: require("./github.svg").default
};

const SocialButton = ({ href, icon, children }) => {
  const Icon = socialIcons[icon];
  return (
    <a
      href={href}
      css={[
        {
          display: "flex",
          padding: " .25rem .75rem",
          borderRadius: "3px",
          textDecoration: "none",
          fontSize: "1rem"
        },
        socialStyles[icon]
      ]}
    >
      <div css={{ height: "20px" }}>
        <Icon width="20px" height="auto" />
      </div>
      <span>{children}</span>
    </a>
  );
};
export default SocialButton;
