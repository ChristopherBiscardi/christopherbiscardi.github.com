import React from "react";
import { Link } from "gatsby";
import { css, Styled, Flex } from "theme-ui";
import Share from "./share";
import ConvertKitForm from "./convertkit-form";
import { Location } from "@reach/router";

const Footer = ({ previous, next, title }) => (
  <Location>
    {({ location }) => (
      <footer>
        <Share
          url={location.href}
          title={title}
          twitterHandle={"@chrisbiscardi"}
        />
        <div css={css({ margin: [0, "0 -300px"] })}>
          <ConvertKitForm />
        </div>
        {(previous || next) && (
          <Flex
            as="ul"
            css={{
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0
            }}
          >
            <li>
              {previous && (
                <Styled.a as={Link} to={previous.slug} rel="prev">
                  ← {previous.title}
                </Styled.a>
              )}
            </li>
            <li>
              {next && (
                <Styled.a as={Link} to={next.slug} rel="next">
                  {next.title} →
                </Styled.a>
              )}
            </li>
          </Flex>
        )}
      </footer>
    )}
  </Location>
);

export default Footer;
