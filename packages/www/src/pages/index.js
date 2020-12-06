import { h } from "preact";
import Icon from "../components/small-icons/index.js"; //, { iconFromList }
import SocialButton from "../components/social-button/index.js";
import { Helmet } from "react-helmet";
// import ConvertKitForm from "../components/convertkit-form/index.js";

const NyanCat = props => (
  <img
    {...props}
    // TODO
    // src={`data:image/webp;base64,${images.nyanCat}`}
    src="/img/nyan-cat-rainbow.webp"
    alt="nyan cat rainbow animated"
  />
);

export default props => {
  return (
    <main>
      <Helmet>
        <meta
          name="twitter:image"
          content="https://christopherbiscardi.com/img/main-opengraph-image.png"
        />
      </Helmet>
      <Hero />
      <Rust />
      <Serverless />
      <div class="flex relative">
        <NyanCat
          class="absolute"
          style={{ height: "37px", right: 0, top: -18 }}
        />
      </div>
      <Toast />
      <Podcasts />
    </main>
  );
};

const LowerTilt = ({ color, flip, props }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        overflow: "hidden",
        lineHeight: 0,
        transform: `rotate(180deg)${flip ? " rotateY(180deg)" : ""}`
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: "relative",
          display: "block",
          width: "calc(100% + 1.3px)",
          height: "150px",
          transform: `rotateY(180deg)`
        }}
      >
        <filter id="blurMe">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5"></feGaussianBlur>
        </filter>
        <defs>
          <linearGradient id="MyGradient" gradientTransform="rotate(130)">
            <stop offset="0%" stop-color="white"></stop>
            <stop offset="50%" stop-color="#ffffff00"></stop>
          </linearGradient>
        </defs>

        <path
          d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
          class="shape-fill"
          style={{ fill: color || "#161e2e" }}
        ></path>
      </svg>
    </div>
  );
};

const Hero = props => (
  <div
    class="relative pb-16"
    style={{
      backgroundImage:
        "linear-gradient(153deg, rgba(152, 152, 152, 0.03) 0%, rgba(152, 152, 152, 0.03) 9%,rgba(197, 197, 197, 0.03) 9%, rgba(197, 197, 197, 0.03) 21%,rgba(106, 106, 106, 0.03) 21%, rgba(106, 106, 106, 0.03) 32%,rgba(222, 222, 222, 0.03) 32%, rgba(222, 222, 222, 0.03) 72%,rgba(16, 16, 16, 0.03) 72%, rgba(16, 16, 16, 0.03) 92%,rgba(181, 181, 181, 0.03) 92%, rgba(181, 181, 181, 0.03) 97%,rgba(130, 130, 130, 0.03) 97%, rgba(130, 130, 130, 0.03) 100%),linear-gradient(39deg, rgba(237, 237, 237, 0.03) 0%, rgba(237, 237, 237, 0.03) 22%,rgba(126, 126, 126, 0.03) 22%, rgba(126, 126, 126, 0.03) 55%,rgba(196, 196, 196, 0.03) 55%, rgba(196, 196, 196, 0.03) 61%,rgba(121, 121, 121, 0.03) 61%, rgba(121, 121, 121, 0.03) 71%,rgba(133, 133, 133, 0.03) 71%, rgba(133, 133, 133, 0.03) 84%,rgba(132, 132, 132, 0.03) 84%, rgba(132, 132, 132, 0.03) 97%,rgba(185, 185, 185, 0.03) 97%, rgba(185, 185, 185, 0.03) 100%),linear-gradient(124deg, rgba(168, 168, 168, 0.03) 0%, rgba(168, 168, 168, 0.03) 7%,rgba(169, 169, 169, 0.03) 7%, rgba(169, 169, 169, 0.03) 19%,rgba(73, 73, 73, 0.03) 19%, rgba(73, 73, 73, 0.03) 50%,rgba(150, 150, 150, 0.03) 50%, rgba(150, 150, 150, 0.03) 67%,rgba(68, 68, 68, 0.03) 67%, rgba(68, 68, 68, 0.03) 81%,rgba(111, 111, 111, 0.03) 81%, rgba(111, 111, 111, 0.03) 91%,rgba(191, 191, 191, 0.03) 91%, rgba(191, 191, 191, 0.03) 100%),linear-gradient(95deg, rgba(147, 147, 147, 0.03) 0%, rgba(147, 147, 147, 0.03) 17%,rgba(79, 79, 79, 0.03) 17%, rgba(79, 79, 79, 0.03) 27%,rgba(28, 28, 28, 0.03) 27%, rgba(28, 28, 28, 0.03) 45%,rgba(27, 27, 27, 0.03) 45%, rgba(27, 27, 27, 0.03) 56%,rgba(228, 228, 228, 0.03) 56%, rgba(228, 228, 228, 0.03) 64%,rgba(38, 38, 38, 0.03) 64%, rgba(38, 38, 38, 0.03) 72%,rgba(42, 42, 42, 0.03) 72%, rgba(42, 42, 42, 0.03) 100%),linear-gradient(346deg, rgba(59, 59, 59, 0.03) 0%, rgba(59, 59, 59, 0.03) 16%,rgba(66, 66, 66, 0.03) 16%, rgba(66, 66, 66, 0.03) 20%,rgba(236, 236, 236, 0.03) 20%, rgba(236, 236, 236, 0.03) 41%,rgba(244, 244, 244, 0.03) 41%, rgba(244, 244, 244, 0.03) 55%,rgba(106, 106, 106, 0.03) 55%, rgba(106, 106, 106, 0.03) 61%,rgba(220, 220, 220, 0.03) 61%, rgba(220, 220, 220, 0.03) 63%,rgba(209, 209, 209, 0.03) 63%, rgba(209, 209, 209, 0.03) 100%),linear-gradient(124deg, rgba(255, 36, 0, 0.17), rgba(232, 29, 29, 0.17), rgba(232, 183, 29, 0.17), rgba(227, 232, 29, 0.17), rgba(29, 232, 64, 0.17), rgba(29, 221, 232, 0.17), rgba(43, 29, 232, 0.17), rgba(221, 0, 243, 0.17), rgba(221, 0, 243, 0.17))"
    }}
  >
    <div class="max-w-7xl mx-auto px-42 sm:px-6 lg:px-8 py-16 sm:py-8">
      <h1 class="text-4xl sm:text-6xl font-bold text-gray-100 flex items-center">
        Hey, I&rsquo;m Chris
        <img
          style={{ height: "4rem" }}
          class="sm:ml-4"
          src="/img/party-corgi.gif"
          alt="party corgi rainbow animated"
        />
      </h1>
      <p class="text-2xl text-gray-100 max-w-3xl">
        <span>
          I'm an independent consultant that works with startups built on OSS.
          Here I write about JAMStack, Serverless, MDX, and more. This site is
          built with ESModules,{" "}
        </span>
        <a class="text-pink-400" href="https://twitter.com/toastdotdev">
          Toast
        </a>
        <span>, and MDX. The content is written in </span>
        <a class="text-teal-400" href="https://twitter.com/sectortools">
          Sector
        </a>
        .
      </p>
      <ul class="flex py-4 gap-x-2 mt-4">
        <li class="">
          <SocialButton href="https://twitter.com/chrisbiscardi" icon="twitter">
            Twitter
          </SocialButton>
        </li>
        <li class="hidden sm:inline-block">
          <SocialButton
            href="https://www.twitch.tv/chrisbiscardi"
            icon="twitch"
          >
            Twitch
          </SocialButton>
        </li>
        <li class="hidden sm:inline-block">
          <SocialButton
            href="https://www.youtube.com/channel/UCiSIL22pQRpc-8JNiYDFyzQ"
            icon="youtube"
          >
            YouTube
          </SocialButton>
        </li>
        <li class="">
          <SocialButton
            href="https://github.com/ChristopherBiscardi"
            icon="github"
          >
            GitHub
          </SocialButton>
        </li>
      </ul>
      <LowerTilt />
    </div>
  </div>
);

const Podcasts = props => (
  <div class="bg-white">
    <div class="py-16 mx-auto max-w-7xl px-4 sm:py-24 sm:px-6 ">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8">
        <div class="text-center lg:col-span-12">
          <h2 class="font-bold text-2xl">Appearances</h2>
          <p>
            Curated group of shows and podcasts I've been invited to. Excludes
            anything I've hosted myself and conference talks.
          </p>
        </div>
        <div class="sm:text-center lg:col-span-12 lg:text-left">
          <h2>
            <span class="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
              egghead.io developer chats
            </span>
          </h2>
          <iframe
            height="200px"
            width="100%"
            frameborder="no"
            scrolling="no"
            seamless
            src="https://player.simplecast.com/1b2cfa9c-2a0d-4ba1-a28a-b0a59b8d4b05?dark=false"
          ></iframe>
        </div>
        <a
          href="https://www.heavybit.com/library/podcasts/jamstack-radio/ep-57-jsx-in-markdown-with-chris-biscardi/"
          class="p-4 rounded border mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-4 hover:border-teal-400"
        >
          <h3 class="font-semibold block">Jamstack Radio</h3>
          <p class="block">
            <span>
              In episode of 57 of JAMstack Radio, Brian talks with Chris
              Biscardi, an independent engineer and startup consultant. They
              discuss MDX, the struggles of website migration, and why more
              projects are adopting JAMstack.
            </span>
          </p>
        </a>
        <a
          href="https://www.learnwithjason.dev/build-a-toast-site-using-mdx-tailwind"
          class="p-4 rounded border mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-4 hover:border-teal-400"
        >
          <h3 class="font-semibold block">Learn with Jason</h3>
          <p class="block">
            <span>
              Toast lets us build static sites using modern workflows, creating
              less complex, super fast websites & apps. Chris Biscardi returns
              to teach us how to build an MDX & Tailwind-powered Toast blog!
            </span>
          </p>
        </a>
        <a
          href="https://www.software-engineering-unlocked.com/success-community-building/"
          class="p-4 rounded border mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-4 hover:border-teal-400"
        >
          <h3 class="font-semibold block">Software Engineering Unlocked</h3>
          <p class="block">
            <span>
              In this episode, I talk to Chris Biscardi, an independent software
              consultant about how he became successful through open source and
              community building.
            </span>
          </p>
        </a>
      </div>
    </div>
  </div>
);
const Serverless = props => (
  <div class="py-12 bg-indigo-200">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <p class="text-base leading-6 text-teal-600 font-semibold tracking-wide uppercase">
          Field Guide to
        </p>
        <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Serverless
        </h3>
        <p class="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
          Focus on your business logic by taking a path through the serverless
          ecosystem.{" "}
          <a
            href="/serverless"
            class="text-teal-500 font-bold hover:text-teal-600"
          >
            Learn more...
          </a>
        </p>
      </div>

      <div class="mt-10">
        <ul class="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 space-y-4 md:space-y-0">
          {[
            {
              title: "Compute",
              content:
                "From the basics with Netlify to change data capture and responding to Cognito hooks with AWS Lambda.",
              icon: (
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
              )
            },
            {
              title: "Storage",
              content:
                "Take a dive into serverless-native approaches that scale forever like DynamoDB, Amazon Aurora Serverless, and FaunaDB.",
              icon: (
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
              )
            },
            {
              title: "Test in Production",
              content:
                "Adopt modern approaches to software development like feature flags and continuous delivery with Serverless Framework CI and GitHub Actions.",
              icon: (
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
              )
            },
            {
              title: "Mobile notifications",
              content:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
              icon: (
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
              )
            }
          ].map(({ title, content, icon }) => (
            <li>
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                    {icon}
                  </div>
                </div>
                <div class="ml-4">
                  <h4 class="text-lg leading-6 font-medium text-gray-900">
                    {title}
                  </h4>
                  <p class="mt-2 text-base leading-6 text-gray-600">
                    {content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
const Rust = props => (
  <div class="bg-gray-900 relative pb-32">
    <div class="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
      <div>
        <h2 class="text-base leading-6 font-semibold text-teal-400 uppercase tracking-wide">
          Field Guide to
        </h2>
        <p class="mt-2 text-3xl leading-9 font-extrabold text-gray-100">Rust</p>
        <p class="mt-4 text-lg leading-7 text-gray-400 pr-4">
          Build faster, safer, and more usable software with Rust.
        </p>
        <a
          href="/rust"
          class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-500 hover:bg-teal-400 focus:outline-none focus:bg-teal-400 transition duration-150 ease-in-out mt-4"
        >
          Learn more
        </a>
      </div>
      <div class="mt-12 lg:mt-0 lg:col-span-2">
        <dl class="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
          {[
            {
              title: "Command Line Interfaces",
              content:
                "Build robust CLIs with structopt, assert_cmd, and indicatif."
            },
            {
              title: "No Data Races",
              content:
                "A data race has Undefined Behavior, and is therefore impossible to perform in Safe Rust."
            },
            {
              title: "No Garbage Collector",
              content:
                " With no runtime and no GC, Rust can power performance-critical services, run on embedded devices, and integrate with otherlanguages."
            },
            {
              title: "Reliable",
              content:
                "You can trust Rust's type system and helpful compiler messages to point you in the right direction."
            },
            {
              title: "Cargo",
              content:
                "A package manager and ecosystem that gives you the best of NPM and more, including testing, documentation, and benchmarks built-in."
            },
            {
              title: "WASM",
              content:
                "Whether publishing to NPM or bundling with Webpack, Rust's WASM support is cutting edge."
            },
            {
              title: "Community",
              content:
                "Built by core teams and working groups that *you* can take a part in."
            },
            {
              title: "Mobile app",
              content:
                "Find what you need with advanced filters, bulk actions, and quick views."
            }
          ].map(({ title, content }) => (
            <div class="flex space-x-3">
              {/* <!-- Heroicon name: check --> */}
              <svg
                class="flex-shrink-0 h-6 w-6 text-green-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div class="space-y-2">
                <dt class="text-lg leading-6 font-medium text-gray-100">
                  {title}
                </dt>
                <dd class="flex space-x-3 lg:py-0 lg:pb-4">
                  <span class="text-base leading-6 text-gray-400">
                    {content}
                  </span>
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
    <LowerTilt color="#cddbfe" flip />
  </div>
);
const Toast = props => (
  <div class="bg-teal-700">
    <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 class="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
        <span class="block">Start blogging.</span>
        <span class="block">Build a site with Toast</span>
      </h2>
      <p class="mt-4 text-lg leading-6 text-teal-200">
        Toast is a Jamstack framework built in Rust that can build 10k pages in
        40 seconds while retaining the developer experience of building a React
        site.
      </p>
      <a
        href="https://toast.dev"
        class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-teal-600 bg-white hover:text-teal-500 hover:bg-teal-50 transition duration-150 ease-in-out sm:w-auto"
      >
        Get Started
      </a>
    </div>
  </div>
);
