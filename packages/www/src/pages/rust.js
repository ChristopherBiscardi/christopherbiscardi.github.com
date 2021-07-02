import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";
import Hero from "../components/field-guides/hero.js";

export default props => (
  <div>
    <Helmet>
      <meta
        name="twitter:image"
        content="https://christopherbiscardi.com/opengraph/opengraph-field-guide-rust.png"
      />
    </Helmet>
    <Hero
      title="Rust"
      description="A language empowering everyone to build reliable and efficient software."
      backgroundColor="#e43a25"
    />
    <div class="pt-16 bg-gray-50 overflow-hidden lg:pt-24">
      <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
        <div class="relative">
          <h3 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Safer, faster programs
          </h3>
          <p class="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
            Rust’s industry-grade tools make collaboration fearless, allowing
            teams to focus on the tasks that matter.
          </p>
        </div>

        <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div class="relative">
            <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
              Automation
            </h4>
            <p class="mt-3 text-lg leading-7 text-gray-500">
              Focus on the code that matters, leaving debates about semicolons
              in the past.
            </p>

            <ul class="mt-10">
              <li>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      {/* <!-- Heroicon name: globe-alt --> */}
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-gray-900">
                      Rustfmt
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      Rustfmt automatically formats Rust code, making it easier
                      to read, write, and maintain. And most importantly: never
                      debate spacing or brace position ever again.
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      {/* <!-- Heroicon name: scale --> */}
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-gray-900">
                      Clippy
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      Clippy builds on top of the Rust compiler to help you
                      write more idomatic and efficient code.
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      {/* <!-- Heroicon name: lightning-bolt --> */}
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-gray-900">
                      Cargo Doc
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      Documentation tooling built-in to the cargo package
                      manager removes the barriers to writing and shipping
                      documentation.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0">
            <img
              class="relative mx-auto"
              width="490"
              src="/rust-clippy-example.png"
              alt=""
            />
          </div>
        </div>

        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div class="lg:col-start-2">
              <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                Rustlings
              </h4>
              <p class="mt-3 text-lg leading-7 text-gray-500">
                Take a guided tour of the Rust programming language from
              </p>

              <ul class="mt-10">
                <li>
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        {/* <!-- Heroicon name: annotation --> */}
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-gray-900">
                        Learn the basics
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        Rust can be a very familiar langauge to people coming
                        from JavaScript based backgrounds. Rustlings covers what
                        you'll need to know to get up and running quickly.
                      </p>
                    </div>
                  </div>
                </li>
                <li class="mt-10">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        {/* <!-- Heroicon name: mail --> */}
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-gray-900">
                        Advanced Rust
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        Rustlings also touches on more advanced concepts such as
                        threading that developers in other langauges might not
                        have been familiar with before.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <ListedLinks links={rustlingsLinks} />
            </div>
          </div>
        </div>
        <Discord />
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .integration-gradient:after {
            transform: scaleY(-1);
            content: "";
            z-index: -1;
            background-color: hsl(201 91% 84% / 1);
            background-image: linear-gradient(
                153deg,
                rgba(152, 152, 152, 0.03) 0%,
                rgba(152, 152, 152, 0.03) 9%,
                rgba(197, 197, 197, 0.03) 9%,
                rgba(197, 197, 197, 0.03) 21%,
                rgba(106, 106, 106, 0.03) 21%,
                rgba(106, 106, 106, 0.03) 32%,
                rgba(222, 222, 222, 0.03) 32%,
                rgba(222, 222, 222, 0.03) 72%,
                rgba(16, 16, 16, 0.03) 72%,
                rgba(16, 16, 16, 0.03) 92%,
                rgba(181, 181, 181, 0.03) 92%,
                rgba(181, 181, 181, 0.03) 97%,
                rgba(130, 130, 130, 0.03) 97%,
                rgba(130, 130, 130, 0.03) 100%
              ),
              linear-gradient(
                39deg,
                rgba(237, 237, 237, 0.03) 0%,
                rgba(237, 237, 237, 0.03) 22%,
                rgba(126, 126, 126, 0.03) 22%,
                rgba(126, 126, 126, 0.03) 55%,
                rgba(196, 196, 196, 0.03) 55%,
                rgba(196, 196, 196, 0.03) 61%,
                rgba(121, 121, 121, 0.03) 61%,
                rgba(121, 121, 121, 0.03) 71%,
                rgba(133, 133, 133, 0.03) 71%,
                rgba(133, 133, 133, 0.03) 84%,
                rgba(132, 132, 132, 0.03) 84%,
                rgba(132, 132, 132, 0.03) 97%,
                rgba(185, 185, 185, 0.03) 97%,
                rgba(185, 185, 185, 0.03) 100%
              ),
              linear-gradient(
                124deg,
                rgba(168, 168, 168, 0.03) 0%,
                rgba(168, 168, 168, 0.03) 7%,
                rgba(169, 169, 169, 0.03) 7%,
                rgba(169, 169, 169, 0.03) 19%,
                rgba(73, 73, 73, 0.03) 19%,
                rgba(73, 73, 73, 0.03) 50%,
                rgba(150, 150, 150, 0.03) 50%,
                rgba(150, 150, 150, 0.03) 67%,
                rgba(68, 68, 68, 0.03) 67%,
                rgba(68, 68, 68, 0.03) 81%,
                rgba(111, 111, 111, 0.03) 81%,
                rgba(111, 111, 111, 0.03) 91%,
                rgba(191, 191, 191, 0.03) 91%,
                rgba(191, 191, 191, 0.03) 100%
              ),
              linear-gradient(
                95deg,
                rgba(147, 147, 147, 0.03) 0%,
                rgba(147, 147, 147, 0.03) 17%,
                rgba(79, 79, 79, 0.03) 17%,
                rgba(79, 79, 79, 0.03) 27%,
                rgba(28, 28, 28, 0.03) 27%,
                rgba(28, 28, 28, 0.03) 45%,
                rgba(27, 27, 27, 0.03) 45%,
                rgba(27, 27, 27, 0.03) 56%,
                rgba(228, 228, 228, 0.03) 56%,
                rgba(228, 228, 228, 0.03) 64%,
                rgba(38, 38, 38, 0.03) 64%,
                rgba(38, 38, 38, 0.03) 72%,
                rgba(42, 42, 42, 0.03) 72%,
                rgba(42, 42, 42, 0.03) 100%
              ),
              linear-gradient(
                346deg,
                rgba(59, 59, 59, 0.03) 0%,
                rgba(59, 59, 59, 0.03) 16%,
                rgba(66, 66, 66, 0.03) 16%,
                rgba(66, 66, 66, 0.03) 20%,
                rgba(236, 236, 236, 0.03) 20%,
                rgba(236, 236, 236, 0.03) 41%,
                rgba(244, 244, 244, 0.03) 41%,
                rgba(244, 244, 244, 0.03) 55%,
                rgba(106, 106, 106, 0.03) 55%,
                rgba(106, 106, 106, 0.03) 61%,
                rgba(220, 220, 220, 0.03) 61%,
                rgba(220, 220, 220, 0.03) 63%,
                rgba(209, 209, 209, 0.03) 63%,
                rgba(209, 209, 209, 0.03) 100%
              ),
              linear-gradient(
                124deg,
                rgba(255, 36, 0, 0.17),
                rgba(232, 29, 29, 0.17),
                rgba(232, 183, 29, 0.17),
                rgba(227, 232, 29, 0.17),
                rgba(29, 232, 64, 0.17),
                rgba(29, 221, 232, 0.17),
                rgba(43, 29, 232, 0.17),
                rgba(221, 0, 243, 0.17),
                rgba(221, 0, 243, 0.17)
              );
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
          }
        `
        }}
      />
      <div class="integration-gradient relative z-0">
        <Posts />
      </div>
    </div>
  </div>
);

const CardGrid = ({ links }) => (
  <div class="overflow-hidden sm:rounded-md">
    <style
      dangerouslySetInnerHTML={{
        __html: `
          .integration-item:before {
            background: #ffffff77;
            content: "";
            border-image-source: linear-gradient(#ffffff33, #ffffff55);
            border-width: 1px;
            border-image-repeat: stretch;
            border-image-slice: 1;
            height: 100%;
            width: 100%;
            position: absolute;
            z-index: -1;
            border-radius: 0.25rem;
          }
        `
      }}
    />
    <ul class="grid grid-cols-1 gap-4">
      {links.map(({ title, description, tag, tagHref, href }, i) => (
        <li class="shadow rounded integration-item relative z-0">
          <a
            href={href}
            class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out h-full align-start rounded"
          >
            <div class="px-4 py-4 flex items-center sm:px-6">
              <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div class="flex-1">
                  <p class="text-sm leading-5 font-medium text-blue-600">
                    <a href={tagHref} class="hover:underline">
                      {tag}
                    </a>
                  </p>
                  <div>
                    <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
                      {title}
                    </h3>
                    <p class="mt-3 text-base leading-6 text-gray-800">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
              <div class="ml-5 flex-shrink-0">
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
      ))}
    </ul>
  </div>
);

const postCards = [
  {
    title: "Building a Rust CLI with subcommands using structopt and clap",
    description:
      "Using structopt we can derive our arguments from an enum to generate subcommands.",
    href: "/building-a-rust-cli-with-subcommands-using-structopt-and-clap",
    tag: "structopt",
    tagHref: "/garden"
  },
  {
    title: "Parsing Rust enums from JSON with Serde and tagged types",
    description:
      "JSON, being untyped, can represent multiple types in the same field. Serde can parse these into Rust enums in a few ways.",
    href: "/parsing-rust-enums-from-json-with-serde-and-tagged-types",
    tag: "Serde",
    tagHref: "/garden"
  },
  {
    title:
      "Automatically Pinning Spotify listening party messages in Discord with Serenity",
    description: "",
    href:
      "/automatically-pinning-spotify-listening-party-messages-in-discord-with-rust-and-serenity",
    tag: "discord",
    tagHref: "/garden"
  },
  {
    title: "Are functions in Rust statements or expressions?",
    description:
      "A key insight into the Rust language is what an expression is and that they return values in tail position, leading to 'implicit returns'.",
    href: "/are-functions-in-rust-statements-or-expressions",
    tag: "Rust",
    tagHref: "/garden"
  },
  {
    title:
      "On-Demand (lazy) inputs for incremental computation in salsa with file watching powered by notify in Rust",
    description:
      "The Salsa crate allows us to trigger incremental computation through input chagnes. When paired with file watching, we can trigger regeneration of derived queries through file changes.",
    href:
      "/on-demand-lazy-inputs-for-incremental-computation-in-salsa-with-file-watching-powered-by-notify-in-rust",
    tag: "salsa",
    tagHref: "/garden"
  },
  {
    title: "Checking for a minimum node version in Rust with Command",
    description:
      "Rust's Command allows us to execute subcommands and gather the output easily allowing us to do things like check for a node version when building tools for JS devs.",
    href: "/checking-for-a-minimum-node-version-in-rust-with-command",
    tag: "language",
    tagHref: "/garden"
  },

  {
    title:
      "Piping Rust code to rustfmt with configuration for shorter code examples in blog posts",
    description:
      "You can pipe code directly to rustfmt when sharing code on different platforms (or your blog) to make it more readable for other people.",
    href:
      "/piping-rust-code-to-rustfmt-with-configuration-for-shorter-code-examples-in-blog-posts",
    tag: "tooling",
    tagHref: "/garden"
  },
  {
    title: "Custom Error types with Nom 5",
    description:
      "Parsing can result in many application specific errors. Here's how to signal that when using the Nom parser-combinator library.",
    href: "/custom-error-types-with-nom-5-in-rust",
    tag: "parsing",
    tagHref: "/garden"
  },
  {
    title: "Serving HTTP over unix domain sockets with Tide",
    description:
      "When building tools for JS devs, one way we can enable users to write JS that communicates with our Rust implementations is via sockets.",
    href: "/rust-java-script-communication-over-unix-domain-sockets-with-tide",
    tag: "tide",
    tagHref: "/garden"
  },
  {
    title: "Concatenating two string slices &str in Rust",
    description:
      "Using format! to concatenate two strings is idomatic Rust, even though it's not the absolute fastest way.",
    href: "/concatenating-two-string-slices-and-str-in-rust",
    tag: "idiomatic",
    tagHref: "/garden"
  },
  {
    title: "Processing realtime tweets from twitter in Rust",
    description:
      "Using egg_mode and the tokio runtime enables us to use streams and futures to pull in and process tweets.",
    href: "/processing-realtime-tweets-from-twitter-in-rust"
  }
];
const Posts = props => (
  <Fragment>
    <div>
      <div class="max-w-screen-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-base leading-6 font-semibold text-blue-600 tracking-wide uppercase">
            Integrations
          </h1>
          <p class="mt-1 text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            What can you do with Rust?
          </p>
          <p class="max-w-xl mt-5 mx-auto text-xl leading-7 text-gray-800">
            From building CLI tools to serverless functions, from parsing
            markdown to running Discord bots, Rust can handle a wide array of
            applications.
          </p>
        </div>
      </div>
    </div>
    <div class="pb-16 lg:pb-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <CardGrid links={postCards} />
      </div>
    </div>
  </Fragment>
);

const discordLinks = [
  {
    title: "Separating pin and delete message permissions using Serenity",
    location: "garden",
    href:
      "/separating-pin-and-delete-message-permissions-in-discord-using-rust-and-serenity",
    tags: ["discord", "serenity"]
  },
  {
    title: "Automatically pinning Spotify listening party messages in Discord",
    location: "garden",
    href:
      "/automatically-pinning-spotify-listening-party-messages-in-discord-with-rust-and-serenity",
    tags: ["screencasts", "node.js", "dynamodb"]
  }
];
const rustlingsLinks = [
  {
    title: "Learning Rust by Working Through the Rustlings Exercises",
    location: "egghead",
    href:
      "https://egghead.io/playlists/learning-rust-by-solving-the-rustlings-exercises-a722",
    tags: ["screencasts", "language", "beginner-friendly"]
  },
  {
    title: "Referencing contiguous slices of data we don't own using range",
    location: "egghead",
    href:
      "https://egghead.io/lessons/rust-rustlings-primitive_types4-referencing-contiguous-slices-of-data-we-don-t-own-using-range?pl=learning-rust-by-solving-the-rustlings-exercises-a722",
    tags: ["slices", "range"]
  },
  {
    title:
      "Handling errors by unwrapping or early-returning with the `?` operator",
    location: "egghead",
    href:
      "https://egghead.io/lessons/rust-rustlings-errors2-handling-errors-by-unwrapping-or-early-returning-with-the-operator?pl=learning-rust-by-solving-the-rustlings-exercises-a722",
    tags: ["error-handling"]
  },
  {
    title: "Writing your first macro",
    location: "egghead",
    href:
      "https://egghead.io/lessons/rust-rustlings-macros1-writing-your-first-macro?pl=learning-rust-by-solving-the-rustlings-exercises-a722",
    tags: ["macros"]
  }
];
const swcLinks = [
  {
    title: "Compiling a single JavaScript file from Rust with swc",
    location: "garden",
    href: "/compiling-a-single-java-script-file-from-rust-with-swc",
    tags: ["toast", "swc"]
  },
  {
    title: "Enabling features in Rust crates installed from GitHub like SWC",
    location: "garden",
    href:
      "http://localhost:63916/enabling-features-in-rust-crates-installed-from-git-hub-like-swc",
    tags: "swc"
  }
];
const ListedLinks = ({ links }) => (
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul>
      {links.map(({ title, location, tags, href }, i) => (
        <li class={i != 0 ? "border-t border-gray-200" : ""}>
          <a
            href={href}
            class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
          >
            <div class="px-4 py-4 flex items-center sm:px-6">
              <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <div class="text-sm leading-5 font-medium text-pink-600 ">
                    {title}
                    <span class="ml-1 font-normal text-gray-500">
                      in {location}
                    </span>
                  </div>
                  <div class="mt-2 flex">
                    <div class="flex items-center text-sm leading-5 text-gray-500">
                      {/* <!-- Heroicon name: calendar --> */}
                      <svg
                        class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>
                        {tags.map(v => (
                          <span class="bg-transparent text-blue-700 font-semibold py-1 px-2">
                            {v}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ml-5 flex-shrink-0">
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
      ))}
    </ul>
  </div>
);

const Discord = props => (
  <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
    <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
      <div class="relative">
        <h3 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          A world of possibility
        </h3>
        <p class="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
          Build Discord bots, Serverless HTTP APIs, CLI tools for JS developers.
        </p>
      </div>

      <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div class="relative">
          <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
            Discord
          </h4>
          <p class="mt-3 text-lg leading-7 text-gray-500">
            Rust's Serenity crate enables you to build async Discord bots with
            distributed tracing built-in.
          </p>

          <ul class="mt-10">
            <li>
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    {/* <!-- Heroicon name: globe-alt --> */}
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h5 class="text-lg leading-6 font-medium text-gray-900">
                    Role Based Access Control
                  </h5>
                  <p class="mt-2 text-base leading-6 text-gray-500">
                    Group commands and restrict access to using them, or even
                    seeing them in the automated help output, using highly
                    customizable role based access control.
                  </p>
                </div>
              </div>
            </li>
            <li class="mt-10">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    {/* <!-- Heroicon name: scale --> */}
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h5 class="text-lg leading-6 font-medium text-gray-900">
                    Collectors
                  </h5>
                  <p class="mt-2 text-base leading-6 text-gray-500">
                    Build rich user interactions by awaiting user input or
                    reactions in the middle of control flow using collector
                    streams.
                  </p>
                </div>
              </div>
            </li>
            <li class="mt-10">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    {/* <!-- Heroicon name: lightning-bolt --> */}
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h5 class="text-lg leading-6 font-medium text-gray-900">
                    Command Framework
                  </h5>
                  <p class="mt-2 text-base leading-6 text-gray-500">
                    Organize your code with the Serenity Command Framework.
                    Build async hooks to execute before every message, bucket
                    commands into rate-limited groups, and handle errors in
                    command execution.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="mt-10 -mx-4 relative lg:mt-0">
          <ListedLinks links={discordLinks} />
        </div>
      </div>
    </div>
  </div>
);
