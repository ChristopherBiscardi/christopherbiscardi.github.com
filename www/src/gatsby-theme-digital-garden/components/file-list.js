import React from "react";
import { Link as GLink } from "gatsby";
import { Link, UnorderedList } from "sens8";

export default ({ files }) => (
  <UnorderedList>
    {files.map(url => (
      <li key={url}>
        <Link as={GLink} to={url}>
          {url}
        </Link>
      </li>
    ))}
  </UnorderedList>
);
