import { h, Fragment } from "preact";

export default props => (
  <div>
    <div class="bg-gray-900">
      <div class="max-w-screen-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-base leading-6 font-semibold text-teal-400 tracking-wide uppercase">
            Field Guide
          </p>
          <h1 class="mt-1 text-4xl leading-10 font-extrabold text-gray-100 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            Serverless
          </h1>
          <p class="max-w-xl mt-5 mx-auto text-xl leading-7 text-gray-400">
            Focus on operationalizing your core business instead of managing
            infrastructure.
          </p>
        </div>
      </div>
    </div>
    <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
        <svg
          class="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
          />
        </svg>

        <div class="relative">
          <h3 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Write less code
          </h3>
          <p class="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
            Serverless architectures allow you to focus more on code that is
            valuable to your business.
          </p>
        </div>

        <div class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div class="relative">
            <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
              Compute
            </h4>
            <p class="mt-3 text-lg leading-7 text-gray-500">
              From the basics with Netlify to advanced integrations with AWS
              lambda there's a range of compute options on the table.
            </p>

            <ul class="mt-10">
              <li>
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-white text-white">
                      <svg class="h-8 w-8" viewBox="0 0 40 40" {...props}>
                        <defs>
                          <radialGradient
                            id="netlify-gradient"
                            cy="0%"
                            r="100.11%"
                            fx="50%"
                            fy="0%"
                            gradientTransform="matrix(0 .9989 -1.152 0 .5 -.5)"
                          >
                            <stop offset="0%" stopColor="#20C6B7" />
                            <stop offset="100%" stopColor="#4D9ABF" />
                          </radialGradient>
                        </defs>
                        <path
                          fill="url(#netlify-gradient)"
                          d="M28.589 14.135l-.014-.006c-.008-.003-.016-.006-.023-.013a.11.11 0 01-.028-.093l.773-4.726 3.625 3.626-3.77 1.604a.083.083 0 01-.033.006h-.015a.104.104 0 01-.02-.017 1.716 1.716 0 00-.495-.381zm5.258-.288l3.876 3.876c.805.806 1.208 1.208 1.355 1.674.022.069.04.138.054.209l-9.263-3.923a.728.728 0 00-.015-.006c-.037-.015-.08-.032-.08-.07 0-.038.044-.056.081-.071l.012-.005 3.98-1.684zm5.127 7.003c-.2.376-.59.766-1.25 1.427l-4.37 4.369-5.652-1.177-.03-.006c-.05-.008-.103-.017-.103-.062a1.706 1.706 0 00-.655-1.193c-.023-.023-.017-.059-.01-.092 0-.005 0-.01.002-.014l1.063-6.526.004-.022c.006-.05.015-.108.06-.108a1.73 1.73 0 001.16-.665c.009-.01.015-.021.027-.027.032-.015.07 0 .103.014l9.65 4.082zm-6.625 6.801l-7.186 7.186 1.23-7.56.002-.01a.136.136 0 01.006-.029c.01-.024.036-.034.061-.044l.012-.005a1.85 1.85 0 00.695-.517c.024-.028.053-.055.09-.06a.09.09 0 01.029 0l5.06 1.04zm-8.707 8.707l-.81.81-8.955-12.942a.424.424 0 00-.01-.014c-.014-.019-.029-.038-.026-.06.001-.016.011-.03.022-.042l.01-.013c.027-.04.05-.08.075-.123l.02-.035.003-.003c.014-.024.027-.047.051-.06.021-.01.05-.006.073-.001l9.921 2.046a.164.164 0 01.076.033c.013.013.016.027.019.043a1.757 1.757 0 001.028 1.175c.028.014.016.045.003.078a.238.238 0 00-.015.045c-.125.76-1.197 7.298-1.485 9.063zm-1.692 1.691c-.597.591-.949.904-1.347 1.03a2 2 0 01-1.206 0c-.466-.148-.869-.55-1.674-1.356L8.73 28.73l2.349-3.643a.15.15 0 01.04-.047c.025-.018.061-.01.091 0a2.434 2.434 0 001.638-.083c.027-.01.054-.017.075.002a.19.19 0 01.028.032L21.95 38.05zM7.863 27.863L5.8 25.8l4.074-1.738a.084.084 0 01.033-.007c.034 0 .054.034.072.065a2.91 2.91 0 00.13.184l.013.016c.012.017.004.034-.008.05l-2.25 3.493zm-2.976-2.976l-2.61-2.61c-.444-.444-.766-.766-.99-1.043l7.936 1.646a.84.84 0 00.03.005c.049.008.103.017.103.063 0 .05-.059.073-.109.092l-.023.01-4.337 1.837zM.831 19.892a2 2 0 01.09-.495c.148-.466.55-.868 1.356-1.674l3.34-3.34a2175.525 2175.525 0 004.626 6.687c.027.036.057.076.026.106a2.776 2.776 0 00-.395.528.16.16 0 01-.05.062c-.013.008-.027.005-.042.002H9.78L.831 19.891zm5.68-6.403l4.491-4.491c.422.185 1.958.834 3.332 1.414 1.04.44 1.988.84 2.286.97.03.012.057.024.07.054.008.018.004.041 0 .06a2.003 2.003 0 00.523 1.828c.03.03 0 .073-.026.11l-.014.021-4.56 7.063a.138.138 0 01-.043.05c-.024.015-.058.008-.086.001a2.274 2.274 0 00-.543-.074c-.164 0-.342.03-.522.063h-.001c-.02.003-.038.007-.054-.005a.21.21 0 01-.045-.051l-4.808-7.013zm5.398-5.398l5.814-5.814c.805-.805 1.208-1.208 1.674-1.355a2 2 0 011.206 0c.466.147.869.55 1.674 1.355l1.26 1.26-4.135 6.404a.155.155 0 01-.041.048c-.025.017-.06.01-.09 0a2.097 2.097 0 00-1.92.37c-.027.028-.067.012-.101-.003-.54-.235-4.74-2.01-5.341-2.265zm12.506-3.676l3.818 3.818-.92 5.698v.015a.135.135 0 01-.008.038c-.01.02-.03.024-.05.03a1.83 1.83 0 00-.548.273.154.154 0 00-.02.017c-.011.012-.022.023-.04.025a.114.114 0 01-.043-.007l-5.818-2.472-.011-.005c-.037-.015-.081-.033-.081-.071a2.198 2.198 0 00-.31-.915c-.028-.046-.059-.094-.035-.141l4.066-6.303zm-3.932 8.606l5.454 2.31c.03.014.063.027.076.058a.106.106 0 010 .057c-.016.08-.03.171-.03.263v.153c0 .038-.039.054-.075.069l-.011.004c-.864.369-12.13 5.173-12.147 5.173-.017 0-.035 0-.052-.017-.03-.03 0-.072.027-.11a.76.76 0 00.014-.02l4.482-6.94.008-.012c.026-.042.056-.089.104-.089l.045.007c.102.014.192.027.283.027.68 0 1.31-.331 1.69-.897a.16.16 0 01.034-.04c.027-.02.067-.01.098.004zm-6.246 9.185l12.28-5.237s.018 0 .035.017c.067.067.124.112.179.154l.027.017c.025.014.05.03.052.056 0 .01 0 .016-.002.025L25.756 23.7l-.004.026c-.007.05-.014.107-.061.107a1.729 1.729 0 00-1.373.847l-.005.008c-.014.023-.027.045-.05.057-.021.01-.048.006-.07.001l-9.793-2.02c-.01-.002-.152-.519-.163-.52z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-gray-900">
                      Netlify Functions
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      Write a single function that accepts two arguments and
                      Netlify takes care of the rest.
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-white text-white">
                      <svg
                        class="h-6 w-6"
                        viewBox="-3.023 -0.22 420.923 433.54"
                        {...props}
                      >
                        <path
                          d="M208.45 227.89c-1.59 2.26-2.93 4.12-4.22 6q-30.86 45.42-61.7 90.83-28.69 42.24-57.44 84.43a3.88 3.88 0 01-2.73 1.59q-40.59-.35-81.16-.88c-.3 0-.61-.09-1.2-.18a14.44 14.44 0 01.76-1.65q28.31-43.89 56.62-87.76 25.11-38.88 50.25-77.74 27.86-43.18 55.69-86.42c2.74-4.25 5.59-8.42 8.19-12.75a5.26 5.26 0 00.56-3.83c-5-15.94-10.1-31.84-15.19-47.74-2.18-6.81-4.46-13.58-6.5-20.43-.66-2.2-1.75-2.87-4-2.86-17 .07-33.9.05-50.85.05-3.22 0-3.23 0-3.23-3.18 0-20.84 0-41.68-.06-62.52 0-2.32.76-2.84 2.94-2.84q51.19.09 102.4 0a3.29 3.29 0 013.6 2.43q27 67.91 54 135.77 31.5 79.14 63 158.3c6.52 16.38 13.09 32.75 19.54 49.17.77 2 1.57 2.38 3.59 1.76 17.89-5.53 35.82-10.91 53.7-16.45 2.25-.7 3.07-.23 3.77 2 6.1 19.17 12.32 38.3 18.5 57.45.21.66.37 1.33.62 2.25-1.28.47-2.48 1-3.71 1.34q-61 19.33-121.93 38.68c-1.94.61-2.52-.05-3.17-1.68q-18.61-47.16-37.31-94.28-18.29-46.14-36.6-92.28c-1.83-4.62-3.63-9.26-5.46-13.88-.29-.79-.69-1.48-1.27-2.7z"
                          fill="#fa7e14"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg leading-6 font-medium text-gray-900">
                      AWS Lambda
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      Custom runtimes, authorization approaches, integration
                      with other AWS services, and more.
                    </p>
                  </div>
                </div>
              </li>
              <li class="mt-10">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
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
                      Edge, Containers, and More
                    </h5>
                    <p class="mt-2 text-base leading-6 text-gray-500">
                      The serverless paradigm goes even deeper by running
                      functions at the edge and running containers without
                      complex orchestration tooling.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-10 -mx-4 relative lg:mt-0">
            <svg
              class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
              width="784"
              height="404"
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="784"
                height="404"
                fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
              />
            </svg>
            <ListedLinks class="relative mx-auto" links={computeLinks} />
          </div>
        </div>

        <svg
          class="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
          />
        </svg>

        <div class="relative mt-12 sm:mt-16 lg:mt-24">
          <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div class="lg:col-start-2">
              <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                Storage
              </h4>
              <p class="mt-3 text-lg leading-7 text-gray-500">
                When Databases are designed with serverless compute options in
                mind, they can handle the unique scaling demands.
              </p>

              <ul class="mt-10">
                <li>
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div class="">
                        <svg
                          class="flex items-center justify-center h-12 w-12 rounded-md text-white"
                          viewBox="0 0 80 80"
                          {...props}
                        >
                          <defs>
                            <linearGradient
                              x1="0%"
                              y1="100%"
                              x2="100%"
                              y2="0%"
                              id="dynamodb-gradient"
                            >
                              <stop stopColor="#2E27AD" offset="0%" />
                              <stop stopColor="#527FFF" offset="100%" />
                            </linearGradient>
                          </defs>
                          <g fill="none" fillRule="evenodd">
                            <path
                              d="M0 0h80v80H0z"
                              fill="url(#dynamodb-gradient)"
                            />
                            <path
                              d="M52.086 54.85c-3.338 2.699-10.341 4.125-17.042 4.125-6.702 0-13.707-1.427-17.044-4.126v5.436h.001c0 2.71 6.999 5.731 17.043 5.731 10.036 0 17.031-3.017 17.042-5.726v-5.44zm.001-10.328l2-.01v.01c0 1.208-.605 2.336-1.783 3.369 1.428 1.256 1.783 2.489 1.783 3.367l-.001.017v9.01c0 5.01-9.811 7.715-19.042 7.715-9.209 0-18.994-2.693-19.041-7.68 0-.006-.003-.01-.003-.016v-9.05l.002-.007c.003-.878.359-2.106 1.785-3.36-1.417-1.251-1.777-2.472-1.786-3.343h.001l-.002-.01v-9.05l.002-.01c.003-.877.36-2.105 1.786-3.357-1.418-1.252-1.778-2.474-1.787-3.344h.001L16 28.76v-9.048l.002-.01C16.019 14.7 25.82 12 35.044 12c5.211 0 10.217.828 13.734 2.272l-.765 1.833c-3.283-1.348-8.01-2.121-12.969-2.121-10.044 0-17.043 3.02-17.043 5.733 0 2.712 6.999 5.733 17.043 5.733.271.003.536 0 .804-.01l.084 1.982c-.296.012-.592.012-.888.012-6.702 0-13.707-1.427-17.044-4.126v5.432h.001v.023c.01 1.04 1.077 1.949 1.971 2.526 2.69 1.715 7.51 2.886 12.885 3.13l-.091 1.981c-5.445-.247-10.213-1.377-13.282-3.108-.756.565-1.483 1.33-1.483 2.197 0 2.711 6.999 5.732 17.043 5.732.985 0 1.963-.032 2.908-.098l.139 1.979c-.99.068-2.016.103-3.047.103-6.702 0-13.707-1.427-17.044-4.126v5.432h.001c.01 1.064 1.077 1.971 1.971 2.55 3.076 1.962 8.852 3.184 15.072 3.184h.44v1.984h-.44c-6.319 0-12.062-1.174-15.574-3.156-.752.564-1.469 1.325-1.469 2.185 0 2.712 6.999 5.734 17.043 5.734 10.036 0 17.031-3.018 17.042-5.727v-.011c-.002-.862-.722-1.623-1.476-2.187-.488.277-1.011.543-1.606.788l-.766-1.833c.726-.298 1.356-.62 1.873-.96.902-.588 1.976-1.507 1.976-2.54zm8.566-14.505h-5.604a1 1 0 01-.827-.435.982.982 0 01-.103-.922l3.409-8.522H44.619l-6 11.902h6.382c.319 0 .619.152.808.407a.989.989 0 01.145.886L40.258 51.09l20.395-21.072zm3.069-.305L38.723 55.54a1.006 1.006 0 01-1.233.165.988.988 0 01-.442-1.153l6.586-20.528h-6.633c-.347 0-.668-.178-.851-.47a.983.983 0 01-.043-.965l7-13.886a1 1 0 01.894-.549h15c.33 0 .642.164.827.435a.984.984 0 01.103.923l-3.41 8.521H63c.4 0 .763.238.92.603a.987.987 0 01-.198 1.076zM19.455 60.674c1.417.799 3.201 1.47 5.302 1.994l.488-1.924c-1.899-.473-3.559-1.094-4.802-1.794l-.988 1.724zM24.757 46.8l.488-1.924c-1.899-.474-3.559-1.095-4.802-1.795l-.988 1.725c1.417.798 3.2 1.47 5.302 1.994zm-5.302-17.863l.988-1.725c1.241.7 2.902 1.32 4.802 1.795l-.488 1.923c-2.104-.525-3.887-1.196-5.302-1.993z"
                              fill="#FFF"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-gray-900">
                        DynamoDB
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        Amazon DynamoDB is a key-value and document database
                        that delivers single-digit millisecond performance at
                        any scale.
                      </p>
                    </div>
                  </div>
                </li>
                <li class="mt-10">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <div>
                        <svg
                          class="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white"
                          viewBox="0 0 80 80"
                          {...props}
                        >
                          <defs>
                            <linearGradient
                              x1="0%"
                              y1="100%"
                              x2="100%"
                              y2="0%"
                              id="aurora-serverless-gradient"
                            >
                              <stop stopColor="#2E27AD" offset="0%" />
                              <stop stopColor="#527FFF" offset="100%" />
                            </linearGradient>
                          </defs>
                          <g fill="none" fillRule="evenodd">
                            <path
                              d="M0 0h80v80H0z"
                              fill="url(#aurora-serverless-gradient)"
                            />
                            <path
                              d="M45.091 18.045h-3.008v-2.018h3.008V13h2.005v3.027h3.009v2.018h-3.009v3.027h-2.005v-3.027zm12.032 11.1h-3.008v-2.019h3.008V24.1h2.006v3.027h3.008v2.018h-3.008v3.027h-2.006v-3.027zm-5.222 31.889c-1.915-4.866-6.335-9.314-11.172-11.242 4.837-1.927 9.257-6.375 11.172-11.241 1.915 4.866 6.335 9.314 11.171 11.241-4.836 1.928-9.256 6.376-11.17 11.242zm16.096-12.25c-7.053 0-15.093-8.092-15.093-15.19 0-.557-.448-1.009-1.003-1.009-.554 0-1.002.452-1.002 1.01 0 7.097-8.042 15.188-15.095 15.188-.553 0-1.002.452-1.002 1.01 0 .557.449 1.008 1.002 1.008 7.053 0 15.095 8.091 15.095 15.19 0 .557.448 1.009 1.002 1.009.555 0 1.003-.452 1.003-1.009 0-7.099 8.04-15.19 15.093-15.19.554 0 1.003-.45 1.003-1.009 0-.557-.45-1.009-1.003-1.009zm-54.992-19.88c2.92 2.136 8.593 3.267 14.038 3.267 5.444 0 11.118-1.13 14.037-3.268v9.665c-1.444 1.933-6.758 3.838-13.837 3.838-8.148 0-14.238-2.563-14.238-4.854v-8.649zm14.038-7.832c8.697 0 14.037 2.645 14.037 4.54 0 1.897-5.34 4.541-14.037 4.541-8.697 0-14.038-2.644-14.038-4.54s5.34-4.54 14.038-4.54zm14.037 37.87c0 2.326-6.005 4.928-14.042 4.928-8.032 0-14.033-2.602-14.033-4.928v-6.448c2.956 2.256 8.743 3.451 14.296 3.451 3.86 0 7.595-.549 10.51-1.546l-.644-1.91c-2.713.926-6.218 1.438-9.866 1.438-8.182 0-14.296-2.563-14.296-4.854v-8.094c2.948 2.252 8.71 3.445 14.238 3.445 5.924 0 11.005-1.228 13.837-3.172v3.028h2.006V25.613c0-4.26-8.265-6.559-16.043-6.559-7.461 0-15.351 2.121-15.98 6.054H11v33.834c0 4.511 8.263 6.946 16.038 6.946 7.78 0 16.048-2.435 16.048-6.946v-3.563H41.08v3.563z"
                              fill="#FFF"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4">
                      <h5 class="text-lg leading-6 font-medium text-gray-900">
                        Aurora Serverless
                      </h5>
                      <p class="mt-2 text-base leading-6 text-gray-500">
                        Aurora Serverless is an on-demand, autoscaling database
                        configuration with MySQL and PostgreSQL.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-10 relative lg:mt-0 lg:col-start-1">
              <svg
                class="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                width="784"
                height="404"
                fill="none"
                viewBox="0 0 784 404"
              >
                <defs>
                  <pattern
                    id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      class="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="784"
                  height="404"
                  fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                />
              </svg>
              <ListedLinks class="relative mx-auto" links={storageLinks} />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 overflow-hidden">
      <div class="relative max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <svg
          class="absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4"
          width="404"
          height="784"
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="8b1b5f72-e944-4457-af67-0c6d15a99f38"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="784"
            fill="url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)"
          />
        </svg>

        <div class="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div class="lg:col-span-1">
            <h3 class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              APIs
            </h3>
          </div>
          <div class="mt-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:col-span-2 lg:mt-0">
            <div>
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                <svg
                  viewBox="0 0 85 95"
                  class="h-6 w-6"
                  fill="white"
                  {...props}
                >
                  <g>
                    <path d="M79.9 31.8c2.6-6.3 2.6-19.1-.8-28.9-.9-1.8-3.6-1.2-3.7.7v.7c-.6 9.4-4 14.5-9.1 17-.8.4-2.1.4-3-.2-6-3.8-13.2-6-20.9-6s-14.8 2.3-20.9 6c-.8.5-1.8.6-2.6.2-5.2-1.9-8.8-7.6-9.4-17.1v-.7c0-1.9-2.8-2.5-3.6-.7-3.4 10-3.3 22.8-.8 29 1.3 3.1 1.3 6.6.2 9.8-1.4 4-2.1 8.5-2 13 .5 20.6 18 38.2 38.7 38.5 21.8.4 39.5-17.1 39.5-39 0-4.4-.7-8.5-2-12.4-1-3.2-.9-6.8.4-9.9zm-38 52.1C26.1 83.5 13 70.6 12.8 54.7 12.4 37.8 26.2 24 43 24.4c15.9.2 28.9 13.3 29.2 29.2.3 16.8-13.4 30.5-30.3 30.3z" />
                    <path d="M47 50.9l-7-10.8c-1.1-1.8-3.4-2.3-5.2-1.2-1.1.7-1.8 1.9-1.8 3.2 0 .7.2 1.4.6 2l4.7 7.4c.4.6.2 1.3-.1 1.8l-7.4 8.1c-1.4 1.5-1.3 3.9.2 5.3.7.6 1.7.9 2.6.9 1.1 0 2-.5 2.7-1.2l5.5-6.4c.5-.5 1.2-.5 1.5.1l3.9 5.6c.2.5.6.8 1.1 1.1 1.3.9 3 .9 4.3.1 1.1-.7 1.8-1.9 1.8-3.2 0-.7-.2-1.4-.6-2L47 50.9z" />
                  </g>
                </svg>
              </div>
              <div class="mt-5">
                <h4 class="text-lg leading-6 font-medium text-gray-900">
                  Hasura
                </h4>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  A GraphQL layer in front of a SQL database that can be
                  accessed from serverless functions
                </p>
                <a
                  href="https://hasura.io/"
                  class="text-pink-500 hover:text-pink-600"
                >
                  Learn more...
                </a>
              </div>
            </div>
            <div class="mt-10 sm:mt-0">
              <div>
                <svg
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white"
                  viewBox="0 0 80 80"
                  {...props}
                >
                  <defs>
                    <linearGradient
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                      id="appsync-gradient"
                    >
                      <stop stopColor="#BD0816" offset="0%" />
                      <stop stopColor="#FF5252" offset="100%" />
                    </linearGradient>
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <path d="M0 0h80v80H0z" fill="url(#appsync-gradient)" />
                    <path
                      d="M66.52 27.98l-5.506-1.39c5.464 9.526 4.596 22.01-2.388 30.012C53.854 62.071 46.772 65 39.652 65c-4.143 0-8.299-.992-12.021-3.051l.952-1.758c9.329 5.163 21.606 3.05 28.556-4.914 6.46-7.4 7.225-18.982 2.1-27.795l-1.429 5.78-1.922-.486 1.982-8.014a.987.987 0 011.201-.728L67 26.037l-.48 1.944zM20.758 51.588L22.19 45.8l1.922.486L22.13 54.3a.992.992 0 01-1.201.73L13 53.025l.48-1.944 5.497 1.389c-5.421-9.366-4.536-20.968 2.482-29.01 7.658-8.772 20.658-11.02 30.911-5.345l-.952 1.757c-9.449-5.228-21.423-3.162-28.472 4.914-6.475 7.42-7.261 18.156-2.188 26.8zm10.638-7.867c1.267 0 2.298 1.042 2.298 2.323 0 1.28-1.031 2.322-2.298 2.322-1.268 0-2.298-1.042-2.298-2.322 0-1.281 1.03-2.323 2.298-2.323zm7.468-8.87c.364.101.74.173 1.136.173.372 0 .726-.063 1.07-.154l3.698 7.984a4.307 4.307 0 00-1.286 2.188h-7.934a4.314 4.314 0 00-1.253-2.16l4.57-8.032zM40 28.374c1.268 0 2.298 1.041 2.298 2.322 0 1.281-1.03 2.323-2.298 2.323-1.267 0-2.297-1.042-2.297-2.323 0-1.28 1.03-2.322 2.297-2.322zm9.932 17.668c0 1.28-1.03 2.322-2.298 2.322-1.267 0-2.298-1.042-2.298-2.322 0-1.281 1.03-2.323 2.298-2.323 1.267 0 2.298 1.042 2.298 2.323zM31.396 50.37c2.017 0 3.703-1.423 4.152-3.324h7.934c.45 1.901 2.135 3.324 4.152 3.324 2.36 0 4.28-1.94 4.28-4.326 0-2.386-1.92-4.327-4.28-4.327-.392 0-.765.072-1.125.172l-3.688-7.963a4.322 4.322 0 001.46-3.228c0-2.386-1.921-4.326-4.281-4.326-2.36 0-4.28 1.94-4.28 4.326a4.32 4.32 0 001.408 3.184l-4.563 8.02a4.176 4.176 0 00-1.169-.185c-2.36 0-4.28 1.94-4.28 4.327 0 2.385 1.92 4.326 4.28 4.326z"
                      fill="#FFF"
                    />
                  </g>
                </svg>
              </div>
              <div class="mt-5">
                <h4 class="text-lg leading-6 font-medium text-gray-900">
                  AppSync
                </h4>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  Fully managed GraphQL API that directly integrates with
                  serverless storage like DynamoDB.
                </p>
                <a
                  href="https://aws.amazon.com/appsync/"
                  class="text-pink-500 hover:text-pink-600"
                >
                  Learn more...
                </a>
              </div>
            </div>
            <div class="mt-10 sm:mt-0">
              <div>
                <svg
                  viewBox="0 0 80 80"
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white"
                  {...props}
                >
                  <defs>
                    <linearGradient
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                      id="api-gateway-gradient"
                    >
                      <stop stopColor="#4D27A8" offset="0%" />
                      <stop stopColor="#A166FF" offset="100%" />
                    </linearGradient>
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <path d="M0 0h80v80H0z" fill="url(#api-gateway-gradient)" />
                    <path
                      d="M34.065 55.632H37v-2.017h-2.935v2.017zm4.935 0h3v-2.017h-3v2.017zM27 14.63l-13 6.453v40.111l13 4.397V14.63zm2 12.764v26.222h3v2.017h-3v11.36c0 .324-.155.629-.416.818a.993.993 0 01-.902.138l-15-5.072A1.008 1.008 0 0112 61.92V20.454c0-.384.217-.735.559-.905l15-7.445a.989.989 0 01.969.049c.293.183.472.507.472.856v12.367h3v2.017h-3zm15 28.24h3v-2.018h-3v2.017zm.065-28.24H47v-2.017h-2.935v2.017zm-5 0H42v-2.017h-2.935v2.017zm-5 0H37v-2.017h-2.935v2.017zM66 21.083l-13-6.454v50.96l13-4.396v-40.11zm2 40.837c0 .432-.274.817-.682.956l-15 5.072a.991.991 0 01-.902-.138 1.012 1.012 0 01-.416-.819V55.632h-1.935v-2.017H51V27.393h-1.935v-2.017H51V13.01c0-.35.179-.673.472-.856a.988.988 0 01.969-.049l15 7.445c.342.17.559.521.559.905V61.92zM42.934 33.807l-1.868-.724-5 13.11 1.868.725 5-13.111zm6.773 6.402a1.013 1.013 0 000-1.426l-4-4.034-1.414 1.426 3.293 3.32-3.293 3.322 1.414 1.426 4-4.034zm-15.414 4.034l-4-4.034a1.013 1.013 0 010-1.426l4-4.034 1.414 1.426-3.293 3.32 3.293 3.322-1.414 1.426z"
                      fill="#FFF"
                    />
                  </g>
                </svg>
              </div>
              <div class="mt-5">
                <h4 class="text-lg leading-6 font-medium text-gray-900">
                  API Gateway HTTP
                </h4>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  Deploy lambdas to handle specific resources in your Rest API
                  or respond to webhooks from other services.
                </p>
                <a
                  href="https://aws.amazon.com/api-gateway/"
                  class="text-pink-500 hover:text-pink-600"
                >
                  Learn more...
                </a>
              </div>
            </div>
            <div class="mt-10 sm:mt-0">
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
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
              <div class="mt-5">
                <h4 class="text-lg leading-6 font-medium text-gray-900">
                  Websockets
                </h4>
                <p class="mt-2 text-base leading-6 text-gray-500">
                  Back realtime user interaction with lambda functions or a
                  GraphQL API.
                </p>
                <a
                  href="https://aws.amazon.com/api-gateway/"
                  class="text-pink-500 hover:text-pink-600"
                >
                  Learn more...
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Integrations />
  </div>
);

const computeLinks = [
  {
    title:
      "Building a Serverless JAMStack Todo app with Netlify, Gatsby, GraphQL, and FaunaDB",
    location: "egghead",
    href:
      "https://egghead.io/playlists/building-a-serverless-jamstack-todo-app-with-netlify-gatsby-graphql-and-faunadb-53bb",
    tags: ["netlify", "gatsby", "identity"]
  },
  {
    title:
      "Converting a Serverless App to run on AWS Lambda and DynamoDB with Serverless Framework",
    location: "egghead",
    href:
      "https://egghead.io/playlists/converting-a-serverless-app-to-run-on-aws-lambda-and-dynamodb-with-serverless-framework-223a",
    tags: ["serverless-framework", "aws-lambda", "dynamodb"]
  },
  {
    title:
      "Building an OpenGraph image generation API with Cloudinary, Netlify Functions, and React",
    location: "egghead",
    href:
      "https://egghead.io/playlists/building-an-opengraph-image-generation-api-with-cloudinary-netlify-functions-and-react-914e",
    tags: ["react", "cloudinary", "netlify", "figma", "playwright"]
  }
];
const storageLinks = [
  {
    title: "Intro to DynamoDB",
    location: "egghead",
    href: "https://egghead.io/playlists/intro-to-dynamodb-f35a",
    tags: ["screencasts", "basics"]
  },
  {
    title: "DynamoDB: The node.js DocumentClient",
    location: "egghead",
    href:
      "https://egghead.io/playlists/dynamodb-the-node-js-documentclient-1396",
    tags: ["screencasts", "node.js", "dynamodb"]
  },
  {
    title: "Notes on DynamoDB",
    location: "garden",
    href: "https://www.christopherbiscardi.com/dynamo-db",
    tags: ["writing", "architecture"]
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
                          <span class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-1 px-2  rounded">
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

const CardGrid = ({ links }) => (
  <div class="overflow-hidden sm:rounded-md">
    <ul class="grid grid-cols-3 gap-4">
      {links.map(({ title, description, tags, href }, i) => (
        <li class="bg-white shadow rounded">
          <a
            href={href}
            class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
          >
            <div class="px-4 py-4 flex items-center sm:px-6">
              <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <div class="text-xl leading-5 font-medium text-gray-800">
                    {title}
                  </div>
                  <p class="text-gray-700 mt-4">{description}</p>
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
                          <span class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-1 px-2  rounded">
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

const integrationCards = [
  {
    title: "Choosing an authentication provider",
    description:
      "Netlify Identity? Firebase Auth? Auth0? AWS Cognito? Will you outgrow your simple solution and regret your decisions? Which one should you even pick in the first place?",
    href: "",
    tags: []
  },
  {
    title: "Taking advantage of the Stripe Billing Portal",
    description:
      "You don't want to write billing logic from scratch. With serverless functions and Stripe Checkout, the Billing Portal enables you to get back to what you love doing.",
    href: "",
    tags: []
  },
  {
    title: "Taking advantage of the Stripe Billing Portal",
    description:
      "You don't want to write billing logic from scratch. With serverless functions and Stripe Checkout, the Billing Portal enables you to get back to what you love doing.",
    href: "",
    tags: []
  },
  {
    title: "Taking advantage of the Stripe Billing Portal",
    description:
      "You don't want to write billing logic from scratch. With serverless functions and Stripe Checkout, the Billing Portal enables you to get back to what you love doing.",
    href: "",
    tags: []
  }
];
const Integrations = props => (
  <Fragment>
    <div class="bg-teal-50">
      <div class="max-w-screen-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-base leading-6 font-semibold text-indigo-600 tracking-wide uppercase">
            Integrations
          </h1>
          <p class="mt-1 text-4xl leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            Focus on what matters
          </p>
          <p class="max-w-xl mt-5 mx-auto text-xl leading-7 text-gray-500">
            Choose the right vendors to integrate with for authentication,
            billing, and more so you can focus on what makes you different.
          </p>
        </div>
      </div>
    </div>
    <div class="bg-teal-50 pb-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <CardGrid links={integrationCards} />
      </div>
    </div>
  </Fragment>
);
