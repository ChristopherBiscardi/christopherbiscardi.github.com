import { h } from "preact";
import { useState } from "preact/hooks";

export default props => (
  <div>
    <ConvertKitForm />
  </div>
);

const FORM_ID = process.env.TOAST_CONVERTKIT_SIGNUP_FORM;
const ConvertKitForm = props => {
  const [success, setSuccess] = useState();
  return (
    <div class="bg-gray-800">
      <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        {success ? (
          <div class="lg:w-0 lg:flex-1">
            <h2
              class="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10"
              id="newsletter-headline"
            >
              Thank you for signing up!
            </h2>
            <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
              Check your email :) you'll see a confirmation shortly.
            </p>
          </div>
        ) : (
          <div class="lg:w-0 lg:flex-1">
            <h2
              class="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10"
              id="newsletter-headline"
            >
              Sign up for my free newsletter
            </h2>
            <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
              My newsletter is where you'll find exclusive content from me. I
              write about technology, startups, and why you shouldn't call
              yourself a junior engineer
            </p>
          </div>
        )}
        <div class="mt-8 lg:mt-0 lg:ml-8 lg:w-1/4">
          {success ? (
            <svg
              class="text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <form
              class="flex flex-col gap-y-4"
              aria-labelledby="newsletter-headline"
              onSubmit={async e => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const name = formData.get("name");
                const email = formData.get("email");
                const res = await fetch(
                  `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`,
                  {
                    method: "post",
                    body: JSON.stringify(
                      {
                        first_name: name,
                        email_address: email
                      },
                      null,
                      2
                    ),
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                    }
                  }
                ).then(r => r.json());
                if (res.status === "failed") {
                  console.error(res);
                } else if (res.status === "success") {
                  setSuccess(true);
                }
              }}
            >
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium leading-5 text-gray-200"
                >
                  Preferred Name
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="name"
                    type="name"
                    name="name"
                    class="form-input appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out bg-gray-900 border-gray-700 focus:border-teal-400"
                  />
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-5 text-gray-200"
                >
                  Email address
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    class="form-input appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out bg-gray-900 border-gray-700 focus:border-teal-400"
                  />
                </div>
              </div>
              <div class="mt-3 rounded-md shadow sm:flex-shrink-0">
                <button class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-500 hover:bg-teal-400 focus:outline-none focus:bg-teal-400 transition duration-150 ease-in-out">
                  Sign up
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
