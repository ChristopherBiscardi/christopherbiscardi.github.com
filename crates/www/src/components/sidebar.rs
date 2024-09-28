use crate::components::Footer;
use leptos::prelude::*;

struct MenuItem<'a> {
    url: &'a str,
    shortcode: &'a str,
    label: &'a str,
}
const MENU_ITEMS: [MenuItem; 3] = [
    MenuItem {
        url: "https://www.rustadventure.dev/",
        shortcode: "RA",
        label: "Rust Adventure",
    },
    MenuItem {
        url: "https://thisweekinbevy.com/",
        shortcode: "B",
        label: "This Week in Bevy",
    },
    MenuItem {
        url: "https://www.youtube.com/@chrisbiscardi",
        shortcode: "YT",
        label: "YouTube",
    },
];

#[slot]
pub struct Header {
    children: ChildrenFn,
}

#[component]
pub fn Sidebar(
    #[prop(optional)] header: Option<Header>,
    children: Children,
) -> impl IntoView {
    view! {
        <div>

            {} <div class="relative z-50 xl:hidden" role="dialog" aria-modal="true">

                {}

                <div class="fixed inset-0 bg-slate-900/80" aria-hidden="true"></div>

                <div class="fixed inset-0 flex">

                    {}
                    <div class="relative mr-16 flex w-full max-w-xs flex-1">

                        {} <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                            <button type="button" class="-m-2.5 p-2.5">
                                <span class="sr-only">Close sidebar</span>
                                <svg
                                    class="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        {}
                        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 ring-1 ring-white/10">
                            <a href="/" class="flex h-16 shrink-0 items-center">
                                <img
                                    class="h-8 w-auto"
                                    src="/logos/logo-full.svg"
                                    alt="Chris Biscardi"
                                />
                            </a>
                            <nav class="flex flex-1 flex-col">
                                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" class="-mx-2 space-y-1">
                                            <li>

                                                {}
                                                <a
                                                    href="/garden"
                                                    class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-400 hover:bg-slate-800 hover:text-white"
                                                >
                                                    <svg
                                                        class="h-6 w-6 shrink-0"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 256 256"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z"></path>
                                                    </svg>
                                                    garden
                                                </a>
                                            </li>

                                        </ul>
                                    </li>
                                    <li>
                                        <div class="text-xs font-semibold leading-6 text-slate-400">
                                            Shortcuts
                                        </div>
                                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                                            <For
                                                // a function that returns the items we're iterating over; a signal is fine
                                                each=move || MENU_ITEMS
                                                // a unique key for each item
                                                key=|menu_item| menu_item.shortcode.to_string()
                                                // renders each item to a view
                                                children=move |item| {
                                                    view! {
                                                        <li>

                                                            {}
                                                            <a
                                                                href=item.url
                                                                class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-400 hover:bg-slate-800 hover:text-white"
                                                            >
                                                                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-[0.625rem] font-medium text-slate-400 group-hover:text-white">
                                                                    {item.shortcode}
                                                                </span>
                                                                <span class="truncate">{item.label}</span>
                                                            </a>
                                                        </li>
                                                    }
                                                }
                                            />

                                        </ul>
                                    </li>
                                    <li class="-mx-6 mt-auto">
                                        <a
                                            href="#"
                                            class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-slate-800"
                                        >
                                            <img
                                                class="h-6 w-6 rounded-full bg-slate-800"
                                                src="/logos/logo-circle.svg"
                                                alt=""
                                            />
                                            <span class="sr-only">Links</span>
                                            <span aria-hidden="true">@chrisbiscardi</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {}
            <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">

                {}
                <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-950/10 px-6 ring-1 ring-white/5">
                    <a href="/" class="flex h-16 shrink-0 items-center">
                        <img class="h-8 w-auto" src="/logos/logo-full.svg" alt="Chris Biscardi"/>
                    </a>
                    <nav class="flex flex-1 flex-col">
                        <ul role="list" class="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" class="-mx-2 space-y-1">
                                    <li>

                                        {}
                                        <a
                                            href="/garden"
                                            class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-400 hover:bg-slate-800 hover:text-white"
                                        >
                                            <svg
                                                class="h-6 w-6 shrink-0 text-green-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 256 256"
                                                fill="currentColor"
                                            >
                                                <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z"></path>
                                            </svg>
                                            garden
                                        </a>
                                    </li>

                                </ul>
                            </li>
                            <li>
                                <div class="text-xs font-semibold leading-6 text-slate-400">
                                    Shortcuts
                                </div>
                                <ul role="list" class="-mx-2 mt-2 space-y-1">
                                    <For
                                        // a function that returns the items we're iterating over; a signal is fine
                                        each=move || MENU_ITEMS
                                        // a unique key for each item
                                        key=|menu_item| menu_item.shortcode.to_string()
                                        // renders each item to a view
                                        children=move |item| {
                                            view! {
                                                <li>

                                                    {}
                                                    <a
                                                        href=item.url
                                                        class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-400 hover:bg-slate-800 hover:text-white"
                                                    >
                                                        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-[0.625rem] font-medium text-slate-400 group-hover:text-white">
                                                            {item.shortcode}
                                                        </span>
                                                        <span class="truncate">{item.label}</span>
                                                    </a>
                                                </li>
                                            }
                                        }
                                    />

                                </ul>
                            </li>
                            <li class="-mx-6 mt-auto">
                                <a
                                    href="#"
                                    class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-slate-800"
                                >
                                    <img
                                        class="h-6 w-6 rounded-full bg-slate-900"
                                        src="/logos/logo-circle.svg"
                                        alt=""
                                    />
                                    <span class="sr-only">Links</span>
                                    <span aria-hidden="true">@chrisbiscardi</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="xl:pl-72 flex flex-col">

                {}
                <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-slate-900 px-4 shadow-sm sm:px-6 lg:px-8">
                    <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden">
                        <span class="sr-only">Open sidebar</span>
                        <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>

                    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <form class="flex flex-1" action="#" method="GET">
                            <label for="search-field" class="sr-only">
                                Search
                            </label>
                            <div class="relative w-full">
                                <svg
                                    class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <input
                                    id="search-field"
                                    class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                                    placeholder="Search..."
                                    type="search"
                                    name="search"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <main class="relative textured-bg flex-1">
                    {header.map(|header_inner| (header_inner.children)())} {children()}
                </main> <Footer/>

            </div>
        </div>
    }
}
