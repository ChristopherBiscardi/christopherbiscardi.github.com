use leptos::prelude::*;

#[component]
pub fn Footer() -> impl IntoView {
    view! {
        <div
            class="main-header-darken"
            style="
            background-image: linear-gradient(153deg, rgba(152, 152, 152, 0.03) 0%, rgba(152, 152, 152, 0.03) 9%, rgba(197, 197, 197, 0.03) 9%, rgba(197, 197, 197, 0.03) 21%, rgba(106, 106, 106, 0.03) 21%, rgba(106, 106, 106, 0.03) 32%, rgba(222, 222, 222, 0.03) 32%, rgba(222, 222, 222, 0.03) 72%, rgba(16, 16, 16, 0.03) 72%, rgba(16, 16, 16, 0.03) 92%, rgba(181, 181, 181, 0.03) 92%, rgba(181, 181, 181, 0.03) 97%, rgba(130, 130, 130, 0.03) 97%, rgba(130, 130, 130, 0.03) 100%), linear-gradient(39deg, rgba(237, 237, 237, 0.03) 0%, rgba(237, 237, 237, 0.03) 22%, rgba(126, 126, 126, 0.03) 22%, rgba(126, 126, 126, 0.03) 55%, rgba(196, 196, 196, 0.03) 55%, rgba(196, 196, 196, 0.03) 61%, rgba(121, 121, 121, 0.03) 61%, rgba(121, 121, 121, 0.03) 71%, rgba(133, 133, 133, 0.03) 71%, rgba(133, 133, 133, 0.03) 84%, rgba(132, 132, 132, 0.03) 84%, rgba(132, 132, 132, 0.03) 97%, rgba(185, 185, 185, 0.03) 97%, rgba(185, 185, 185, 0.03) 100%), linear-gradient(124deg, rgba(168, 168, 168, 0.03) 0%, rgba(168, 168, 168, 0.03) 7%, rgba(169, 169, 169, 0.03) 7%, rgba(169, 169, 169, 0.03) 19%, rgba(73, 73, 73, 0.03) 19%, rgba(73, 73, 73, 0.03) 50%, rgba(150, 150, 150, 0.03) 50%, rgba(150, 150, 150, 0.03) 67%, rgba(68, 68, 68, 0.03) 67%, rgba(68, 68, 68, 0.03) 81%, rgba(111, 111, 111, 0.03) 81%, rgba(111, 111, 111, 0.03) 91%, rgba(191, 191, 191, 0.03) 91%, rgba(191, 191, 191, 0.03) 100%), linear-gradient(95deg, rgba(147, 147, 147, 0.03) 0%, rgba(147, 147, 147, 0.03) 17%, rgba(79, 79, 79, 0.03) 17%, rgba(79, 79, 79, 0.03) 27%, rgba(28, 28, 28, 0.03) 27%, rgba(28, 28, 28, 0.03) 45%, rgba(27, 27, 27, 0.03) 45%, rgba(27, 27, 27, 0.03) 56%, rgba(228, 228, 228, 0.03) 56%, rgba(228, 228, 228, 0.03) 64%, rgba(38, 38, 38, 0.03) 64%, rgba(38, 38, 38, 0.03) 72%, rgba(42, 42, 42, 0.03) 72%, rgba(42, 42, 42, 0.03) 100%), linear-gradient(346deg, rgba(59, 59, 59, 0.03) 0%, rgba(59, 59, 59, 0.03) 16%, rgba(66, 66, 66, 0.03) 16%, rgba(66, 66, 66, 0.03) 20%, rgba(236, 236, 236, 0.03) 20%, rgba(236, 236, 236, 0.03) 41%, rgba(244, 244, 244, 0.03) 41%, rgba(244, 244, 244, 0.03) 55%, rgba(106, 106, 106, 0.03) 55%, rgba(106, 106, 106, 0.03) 61%, rgba(220, 220, 220, 0.03) 61%, rgba(220, 220, 220, 0.03) 63%, rgba(209, 209, 209, 0.03) 63%, rgba(209, 209, 209, 0.03) 100%), linear-gradient(124deg, rgba(255, 36, 0, 0.17), rgba(232, 29, 29, 0.17), rgba(232, 183, 29, 0.17), rgba(227, 232, 29, 0.17), rgba(29, 232, 64, 0.17), rgba(29, 221, 232, 0.17), rgba(43, 29, 232, 0.17), rgba(221, 0, 243, 0.17), rgba(221, 0, 243, 0.17))
            "
        >

            // <ConvertKitForm />

            <footer class="mix-blend-color-dodge">
                <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                    <div class="xl:grid xl:grid-cols-3 xl:gap-8">
                        <div class="grid grid-cols-2 gap-8 xl:col-span-2">
                            <div class="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h4 class="text-sm leading-5 font-semibold text-gray-400 tracking-wider uppercase">
                                        I Cover
                                    </h4>
                                    <ul class="mt-4 space-y-4">
                                        <li>
                                            <a
                                                href="/game-development"
                                                class="text-base leading-6 text-gray-300 hover:text-white"
                                            >
                                                Game Development
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/rust"
                                                class="text-base leading-6 text-ctp-text hover:text-white"
                                            >
                                                Rust
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/wasm"
                                                class="text-base leading-6 text-ctp-text hover:text-white"
                                            >
                                                Wasm
                                            </a>
                                        </li>

                                        {}

                                    </ul>
                                </div>
                                <div class="mt-12 md:mt-0">
                                    <h4 class="text-sm leading-5 font-semibold text-gray-400 tracking-wider uppercase">
                                        I Make
                                    </h4>
                                    <ul class="mt-4 space-y-4">
                                        <li>
                                            <a
                                                href="https://rustadventure.dev"
                                                class="text-base leading-6 text-gray-300 hover:text-white"
                                            >
                                                Rust Adventure
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://thisweekinbevy.com"
                                                class="text-base leading-6 text-gray-300 hover:text-white"
                                            >
                                                This Week in Bevy Engine
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://pages.convertkit.com/04c24646a3/c136f814fc"
                                                class="text-ctp-red leading-6 text-gray-300 hover:text-white"
                                            >
                                                <span class="text-blue-300">Personal</span>
                                                Newsletter
                                            </a>
                                        </li>
                                    // <li>
                                    // <a
                                    // href="https://sector.tools/"
                                    // class="text-base leading-6 text-gray-300 hover:text-white"
                                    // >
                                    // Sector Tools
                                    // </a>
                                    // </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="md:grid md:grid-cols-2 md:gap-8">
                                <div class="mt-12 md:mt-0">
                                    <h4 class="text-sm leading-5 font-semibold text-gray-400 tracking-wider uppercase">
                                        I Exist
                                    </h4>
                                    <ul class="mt-4 space-y-4">
                                        <li>
                                            <a
                                                href="https://www.youtube.com/@chrisbiscardi"
                                                class="text-base leading-6 text-gray-300 hover:text-brand-youtube"
                                            >
                                                YouTube
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://hachyderm.io/@chrisbiscardi"
                                                class="text-base leading-6 text-gray-300 hover:text-brand-mastodon"
                                            >
                                                Mastodon
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 border-t border-gray-500 pt-8 md:flex md:items-center md:justify-between">
                        <div class="flex space-x-6 md:order-2">
                            <a
                                href="https://bsky.app/profile/chrisbiscardi.bsky.social"
                                class="text-gray-400 hover:text-[#1185fe]"
                            >
                                <span class="sr-only">Bluesky</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 600 530">
                                <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>
                                </svg>
                            </a>
                            <a
                                href="https://github.com/christopherbiscardi/"
                                class="text-gray-400 hover:text-black"
                            >
                                <span class="sr-only">GitHub</span>
                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </a>
                            <a
                                href="https://dribbble.com/chrisbiscardi"
                                class="text-gray-400 hover:text-gray-300"
                            >
                                <span class="sr-only">Dribbble</span>
                                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                        <p class="mt-8 text-base leading-6 text-gray-400 md:mt-0 md:order-1">
                            Built with <a
                            href="https://www.rust-lang.org/"
                            class="font-bold text-[#d34516]"
                            >Rust</a>, <a href="https://leptos.dev/" class="font-bold text-red-400">Leptos</a>,
                            <a href="https://github.com/tokio-rs/axum" class="font-bold text-[#c83895]">Axum</a>, and <a href="/wasm" class="font-bold text-[#654DF0]">Wasm</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    }
}
