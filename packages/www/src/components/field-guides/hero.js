import { h } from "preact";
import { Helmet } from "react-helmet";

export default function Hero({ title, description }) {
  return (
    <div class="bg-gray-900">
      <Helmet>
        <meta name="twitter:title" content={title} />
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <div class="max-w-screen-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-base leading-6 font-semibold text-teal-400 tracking-wide uppercase">
            Field Guide
          </p>
          <h1 class="mt-1 text-4xl leading-10 font-extrabold text-gray-100 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            {title}
          </h1>
          <p class="max-w-xl mt-5 mx-auto text-xl leading-7 text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
