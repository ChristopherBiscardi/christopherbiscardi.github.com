import { h } from "preact";

const images = {
  default: "/old-icon-logos/default.png",
  css: "/old-icon-logos/css.png",
  emotion: "/old-icon-logos/emotion.png",
  gatsby: "/old-icon-logos/gatsby.png",
  go: "/old-icon-logos/go.png",
  graphql: "/old-icon-logos/graphql.png",
  js: "/old-icon-logos/js.png",
  mdx: "/old-icon-logos/mdx.png",
  fauna: "/old-icon-logos/fauna.png",
  github: "/old-icon-logos/github.png"
};

const aliases = {
  golang: "go",
  "gatsby-themes": "gatsby",
  javascript: "js",
  faunadb: "fauna"
};

const aliasKeys = Object.keys(aliases);
const imageKeys = Object.keys(images);

// /**
//  * Matches a list of keys against the list of icons that
//  * exist. returns a default if none match, returns the
//  * relevant icon otherwise. Can be weighted in the future.
//  *
//  * @param {string[]} tags a list of potential keys to match
//  * @returns {string} a key that can be used in the Icon component
//  * as the icon field
//  */
export const iconFromList = (tags = []) => {
  // the default icon
  let icon = "default";

  for (const tag of tags) {
    // search the list of imageKeys and aliases for a match
    const newIcon = imageKeys.concat(aliasKeys).find(key => key === tag);
    if (newIcon) {
      if (aliasKeys.includes(newIcon)) {
        // if the icon is ones of the aliases, use that
        icon = aliases[newIcon];
      } else {
        // otherwise return the icon name
        icon = newIcon;
      }
      break;
    }
  }
  return icon;
};

// export default ({ icon }) => (
//   <img src={`data:image/png;base64,${images[icon]}`} css={{ height: "20px" }} />
// );

// TODO: how to get this done? Maybe actually do the svg importer?
export default ({ icon }) => <img src={images[icon]} />;
