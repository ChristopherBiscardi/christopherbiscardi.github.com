import React from "react";
import isPresent from "is-present";
import { Styled } from "theme-ui";
import { Link as GLink } from "gatsby";
import { Link } from "sens8";
import { Folder } from "react-feather";
import { Box } from "gatsby-theme-digital-garden/src/components/ui";

export default ({ directories }) =>
  isPresent(directories) ? (
    <>
      <Box py={3} style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.entries(directories).map(([key, value]) => (
          <Link as={GLink} key={key} to={value[0].pagePath}>
            <Box
              w={[1, 2, 2]}
              p={3}
              key={key}
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Folder style={{ marginRight: "10px" }} />
              <span>{key}</span>
            </Box>
          </Link>
        ))}
      </Box>
      <hr />
    </>
  ) : null;
