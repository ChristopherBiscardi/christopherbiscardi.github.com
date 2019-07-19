import React from "react";
import { Link } from "gatsby";
import { css, Styled, Flex } from "theme-ui";
import Bio from "gatsby-theme-blog/src/components/bio";
import ConvertKitForm from "../../components/convertkit-form";
import { Text } from "sens8";

const Footer = ({ previous, next }) => (
  <footer
    css={css({
      mt: 4,
      pt: 3
    })}
  >
    <Styled.hr />
    <Bio />
    <ConvertKitFooterish />
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
            <Styled.a as={Link} to={previous.node.slug} rel="prev">
              ← {previous.node.title}
            </Styled.a>
          )}
        </li>
        <li>
          {next && (
            <Styled.a as={Link} to={next.node.slug} rel="next">
              {next.node.title} →
            </Styled.a>
          )}
        </li>
      </Flex>
    )}
  </footer>
);

const ConvertKitFooterish = ({ children, ...props }) => {
  return (
    <div
      css={{
        marginTop: "50px",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        marginBottom: "1.5rem"
      }}
    >
      <div
        css={{
          maxWidth: "36em",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gridGap: "1rem"
        }}
      >
        <div
          css={{
            border: "1px solid #1fa9f4",
            maxWidth: "200px",
            padding: "1rem",
            borderRadius: "3px",
            transform: "translateY(-50px)"
          }}
        >
          <ConvertKitForm />
        </div>
        {children ? (
          children
        ) : (
          <Styled.p>
            My newsletter is where you'll find exclusive content from me. I
            write about technology, startups, and why you shouldn't call
            yourself a junior engineer
          </Styled.p>
        )}
      </div>
    </div>
  );
};

export default Footer;
