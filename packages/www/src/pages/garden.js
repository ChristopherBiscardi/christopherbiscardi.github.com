import { h } from "preact";
import { Helmet } from "react-helmet";
import { useReducer } from "preact/hooks";

import Icon, { iconFromList } from "../components/small-icons/index.js"; //{ iconFromList }

const initialState = {
  tags: [],
  filter: ""
};
const reducer = (state, action) => {
  switch (action.type) {
    case "addTag":
      return { ...state, tags: state.tags.concat(action.payload) };
    case "removeTag":
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.payload)
      };
    case "filterBy":
      return {
        ...state,
        filter: action.payload
      };
    default:
      throw new Error("Unexpected action");
  }
};

export default props => {
  // const props = { posts: [] };
  const [filterState, filterDispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Chris' Writing</title>
        <meta name="twitter:title" content="All Chris' Writing" />
        <meta name="og:title" content="All Chris' Writing" />
        <meta
          name="description"
          content={"My notes, blog posts, deep dives, and other work"}
        />
        <meta
          name="twitter:description"
          content={"My notes, blog posts, deep dives, and other work"}
        />

        <meta
          name="twitter:image"
          content={encodeURI(
            `https://opengraph.sector.tools/chris?title=Digital Garden`
          )}
        />
      </Helmet>
      <div class="bg-gray-900">
        <div class="max-w-screen-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
          <div class="max-w-xl">
            <h2 class="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
              Digital Garden
            </h2>

            <p class="mt-5 text-xl leading-7 text-gray-400">
              Select tags and search to filter posts
            </p>
          </div>
          <div class="mt-10 w-full max-w-xs hidden sm:block">
            <a href="/what-is-a-digital-garden" class="text-teal-400">
              What is this?
            </a>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul class="flex space-x-4 flex-wrap -mt-4">
          {["Rust", "Serverless", "SwiftUI", "MDX", "GraphQL", "Gatsby"].map(
            value => (
              <li class="mt-4">
                <button
                  class={`font-bold py-2 px-4 border border-teal-900 rounded text-white ${
                    filterState.tags.includes(value)
                      ? "bg-teal-800"
                      : "bg-gray-900 hover:bg-teal-800"
                  }`}
                  style={{
                    // backgroundColor: filterState.tags.includes(value)
                    //   ? "#3981fe"
                    //   : "#10151e",
                    // color: filterState.tags.includes(value)
                    //   ? "#eef1f7"
                    //   : "#3981fe",
                    boxShadow: `inset 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
                inset 0 6.7px 5.3px rgba(0, 0, 0, 0.028),
                inset 0 12.5px 10px rgba(0, 0, 0, 0.035),
                inset 0 22.3px 17.9px rgba(0, 0, 0, 0.042),
                inset 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
                inset 0 100px 80px rgba(0, 0, 0, 0.07)`
                  }}
                  onClick={() => {
                    if (filterState.tags.includes(value)) {
                      filterDispatch({ type: "removeTag", payload: value });
                    } else {
                      filterDispatch({ type: "addTag", payload: value });
                    }
                  }}
                >
                  {value}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <input
          class="form-input block w-full sm:text-sm sm:leading-5 bg-gray-900 text-teal-400 border-gray-700 focus:border-teal-400"
          placeholder="Type here to filter posts..."
          onChange={e => {
            filterDispatch({ type: "filterBy", payload: e.target.value });
          }}
        />
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <ul>
          {props.posts
            .filter(({ tags = [], ...etc }) => {
              if (filterState.tags.length === 0) {
                return true;
              }
              return filterState.tags.some(tag =>
                tags.includes(tag.toLowerCase())
              );
            })
            .filter(({ title }) =>
              title.toLowerCase().includes(filterState.filter.toLowerCase())
            )
            .sort((aPost, bPost) => {
              const a = new Date(aPost.updatedAt);
              const b = new Date(bPost.updatedAt);
              return a > b ? -1 : a < b ? 1 : 0;
            })
            .map(({ id, title, slug, tags = [], contentType }) => (
              <Post
                logo={iconFromList(tags)}
                to={slug}
                key={id}
                contentType={contentType}
                tags={tags}
              >
                {title}
              </Post>
            ))}
        </ul>
      </div>
    </div>
  );
};

const Post = ({ to, logo, tags, children }) => (
  <li>
    <a
      href={to}
      class="block hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition duration-150 ease-in-out rounded-lg"
    >
      <div class="flex items-center px-4 py-4 sm:px-6">
        <div class="min-w-0 flex-1 flex items-center">
          <div class="flex-shrink-0 h-8 w-8">
            <Icon icon={logo} />
          </div>
          <div class="min-w-0 flex-1 px-4">
            <div>
              <div class="text-lg leading-5 font-medium text-teal-300 flex">
                {children}
              </div>
              <div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{tags.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <!-- Heroicon name: chevron-right --> */}
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </a>
  </li>
);
