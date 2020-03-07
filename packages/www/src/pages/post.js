/* @jsx jsx */
import { Fragment } from "preact";
import { jsx } from "@emotion/preact-core";
import Icon, { iconFromList } from "../components/small-icons/index.js";
console.log("icon", iconFromList);
// import ConvertKitForm from "../components/convertkit-form";
const maxWidth = "800px";

const List = ({ title, subtitle, secondary, ...props }) =>
  console.log(props) || (
    <div css={{ maxWidth, margin: "auto", marginBottom: "3rem" }}>
      <div
        css={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <h2 css={{ margin: 0 }}>{title}</h2>
        {secondary}
      </div>
      <ul css={{ listStyleType: "none", margin: 0, padding: 0 }}>
        {props.children}
      </ul>
    </div>
  );

const ListItem = ({ to, logo, children }) => {
  return (
    <li>
      <a
        to={to}
        href={to}
        css={{
          color: "rgba(255,255,255,0.86)",
          display: "flex",
          borderRadius: "8px",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "#2D3747"
          },
          padding: "1rem",
          margin: "0 -1rem"
        }}
      >
        <Icon icon={logo} />
        <span css={{ marginLeft: "10px" }}>{children}</span>
      </a>
    </li>
  );
};

export default props => {
  console.log("props", props);
  return (
    <Fragment>
      {/* <SEO title="Chris Biscardi" /> */}
      <List
        title="All Posts"
        secondary={
          <a
            to="/post"
            css={{
              color: "rgba(255,255,255,0.86)",
              textDecoration: "none",
              // margin is to align baseline with heading
              marginBottom: "2px",
              alignSelf: "flex-end",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
          >
            all posts
          </a>
        }
      >
        {props.posts.map(({ id, title, slug, tags }) => (
          <ListItem logo={iconFromList(tags)} to={slug} key={id}>
            {title}
          </ListItem>
        ))}
      </List>

      {/* <List
        title="Latest Lessons"
        subtitle="egghead.io"
        secondary={
          <a
            href="https://egghead.io/instructors/chris-biscardi"
            css={{
              color: "rgba(255,255,255,0.86)",
              textDecoration: "none",
              // margin is to align baseline with heading
              marginBottom: "2px",
              alignSelf: "flex-end",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
          >
            all lessons
          </a>
        }
      >
        {data.highlightedLessons.map(
          ({ id, title, httpUrl: slug, primaryTag }) => (
            <ListItem
              logo={iconFromList(primaryTag ? [primaryTag.name] : [])}
              to={slug}
              key={id}
            >
              {title}
            </ListItem>
          )
        )}
      </List> */}
      {/* <ConvertKitForm /> */}
    </Fragment>
  );
};
