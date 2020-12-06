import { h } from "preact";
import { Helmet } from "react-helmet";

export default function Hero({ title, description }) {
  return (
    <div
      class="bg-gray-900"
      style={{
        backgroundImage: `linear-gradient(153deg, rgba(152, 152, 152, 0.03) 0%, rgba(152, 152, 152, 0.03) 9%, rgba(197, 197, 197, 0.03) 9%, rgba(197, 197, 197, 0.03) 21%, rgba(106, 106, 106, 0.03) 21%, rgba(106, 106, 106, 0.03) 32%, rgba(222, 222, 222, 0.03) 32%, rgba(222, 222, 222, 0.03) 72%, rgba(16, 16, 16, 0.03) 72%, rgba(16, 16, 16, 0.03) 92%, rgba(181, 181, 181, 0.03) 92%, rgba(181, 181, 181, 0.03) 97%, rgba(130, 130, 130, 0.03) 97%, rgba(130, 130, 130, 0.03) 100%), linear-gradient(39deg, rgba(237, 237, 237, 0.03) 0%, rgba(237, 237, 237, 0.03) 22%, rgba(126, 126, 126, 0.03) 22%, rgba(126, 126, 126, 0.03) 55%, rgba(196, 196, 196, 0.03) 55%, rgba(196, 196, 196, 0.03) 61%, rgba(121, 121, 121, 0.03) 61%, rgba(121, 121, 121, 0.03) 71%, rgba(133, 133, 133, 0.03) 71%, rgba(133, 133, 133, 0.03) 84%, rgba(132, 132, 132, 0.03) 84%, rgba(132, 132, 132, 0.03) 97%, rgba(185, 185, 185, 0.03) 97%, rgba(185, 185, 185, 0.03) 100%), linear-gradient(124deg, rgba(168, 168, 168, 0.03) 0%, rgba(168, 168, 168, 0.03) 7%, rgba(169, 169, 169, 0.03) 7%, rgba(169, 169, 169, 0.03) 19%, rgba(73, 73, 73, 0.03) 19%, rgba(73, 73, 73, 0.03) 50%, rgba(150, 150, 150, 0.03) 50%, rgba(150, 150, 150, 0.03) 67%, rgba(68, 68, 68, 0.03) 67%, rgba(68, 68, 68, 0.03) 81%, rgba(111, 111, 111, 0.03) 81%, rgba(111, 111, 111, 0.03) 91%, rgba(191, 191, 191, 0.03) 91%, rgba(191, 191, 191, 0.03) 100%), linear-gradient(95deg, rgba(147, 147, 147, 0.03) 0%, rgba(147, 147, 147, 0.03) 17%, rgba(79, 79, 79, 0.03) 17%, rgba(79, 79, 79, 0.03) 27%, rgba(28, 28, 28, 0.03) 27%, rgba(28, 28, 28, 0.03) 45%, rgba(27, 27, 27, 0.03) 45%, rgba(27, 27, 27, 0.03) 56%, rgba(228, 228, 228, 0.03) 56%, rgba(228, 228, 228, 0.03) 64%, rgba(38, 38, 38, 0.03) 64%, rgba(38, 38, 38, 0.03) 72%, rgba(42, 42, 42, 0.03) 72%, rgba(42, 42, 42, 0.03) 100%), linear-gradient(346deg, rgba(59, 59, 59, 0.03) 0%, rgba(59, 59, 59, 0.03) 16%, rgba(66, 66, 66, 0.03) 16%, rgba(66, 66, 66, 0.03) 20%, rgba(236, 236, 236, 0.03) 20%, rgba(236, 236, 236, 0.03) 41%, rgba(244, 244, 244, 0.03) 41%, rgba(244, 244, 244, 0.03) 55%, rgba(106, 106, 106, 0.03) 55%, rgba(106, 106, 106, 0.03) 61%, rgba(220, 220, 220, 0.03) 61%, rgba(220, 220, 220, 0.03) 63%, rgba(209, 209, 209, 0.03) 63%, rgba(209, 209, 209, 0.03) 100%), linear-gradient(124deg, rgba(255, 36, 0, 0.17), rgba(232, 29, 29, 0.17), rgba(232, 183, 29, 0.17), rgba(227, 232, 29, 0.17), rgba(29, 232, 64, 0.17), rgba(29, 221, 232, 0.17), rgba(43, 29, 232, 0.17), rgba(221, 0, 243, 0.17), rgba(221, 0, 243, 0.17))`
      }}
    >
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
          <p class="max-w-xl mt-5 mx-auto text-xl leading-7 text-gray-200">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
