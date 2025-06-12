use std::ops::Deref;

use crate::components::sidebar::Sidebar;
use leptos::prelude::*;
// use sens8::button::*;

#[component]
pub fn GardenPage() -> impl IntoView {
    view! {
        <Sidebar>
            <Hero/>
            <div class="pb-24 sm:pb-32">
                <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <Article
                    title="Something about Rust".to_string()
                    image_url="/test-images/01JKC777W14S7H92HS5KJVKAAS.avif".to_string()
                    tags=vec![
                        Tag {
                            display_name: "Rust".to_string(),
                            label: "rust".to_string(),
                        }
                    ]
                    />
                    <Article
                    title="A Bevy application".to_string()
                    image_url="/test-images/01JMVAV66K6AR15Q7F0EFM1H0N.avif".to_string()
                    tags=vec![
                        Tag{
                            display_name: "Rust".to_string(),
                            label: "rust".to_string(),
                        },
                        Tag{
                            display_name: "Bevy".to_string(),
                            label: "bevy".to_string(),
                        }
                    ]/>
                    <Article
                    title="Communicating between JS and Rust/Wasm".to_string()
                    image_url="/test-images/01JNDKF68NC1T06KD14Z503JAG.avif".to_string()
                    tags=vec![Tag{
                        display_name: "Rust".to_string(),
                        label: "rust".to_string(),
                    },
                    Tag{
                        display_name: "Wasm".to_string(),
                        label: "wasm".to_string(),
                    }]/>
                    <Article
                    title="Something about Rust".to_string()
                    image_url="/test-images/01JKC777W14S7H92HS5KJVKAAS.avif".to_string()
                    tags=vec![
                    ]
                    />
                    <Article
                    title="A Bevy application".to_string()
                    image_url="/test-images/01JMVAV66K6AR15Q7F0EFM1H0N.avif".to_string()
                    tags=vec![
                        Tag{
                            display_name: "Rust".to_string(),
                            label: "rust".to_string(),
                        },
                        Tag{
                            display_name: "Bevy".to_string(),
                            label: "bevy".to_string(),
                        },
                        Tag{
                            display_name: "Advent of Code".to_string(),
                            label: "advent-of-code".to_string(),
                        },
                        Tag{
                            display_name: "Parser Combinators".to_string(),
                            label: "parser-combinators".to_string(),
                        }
                    ]/>
                    <Article
                    title="Communicating between JS and Rust/Wasm".to_string()
                    image_url="/test-images/01JNDKF68NC1T06KD14Z503JAG.avif".to_string()
                    tags=vec![Tag{
                        display_name: "Rust".to_string(),
                        label: "rust".to_string(),
                    },
                    Tag{
                        display_name: "Wasm".to_string(),
                        label: "wasm".to_string(),
                    }]/>
                    </div>
                </div>
            </div>

        </Sidebar>
    }
}

#[component]
pub fn Hero() -> impl IntoView {
    view! {
        <div
            class="relative main-header-darken"
            style="background-image: linear-gradient(153deg, rgba(152, 152, 152, 0.03) 0%, rgba(152, 152, 152, 0.03) 9%,rgba(197, 197, 197, 0.03) 9%, rgba(197, 197, 197, 0.03) 21%,rgba(106, 106, 106, 0.03) 21%, rgba(106, 106, 106, 0.03) 32%,rgba(222, 222, 222, 0.03) 32%, rgba(222, 222, 222, 0.03) 72%,rgba(16, 16, 16, 0.03) 72%, rgba(16, 16, 16, 0.03) 92%,rgba(181, 181, 181, 0.03) 92%, rgba(181, 181, 181, 0.03) 97%,rgba(130, 130, 130, 0.03) 97%, rgba(130, 130, 130, 0.03) 100%),linear-gradient(39deg, rgba(237, 237, 237, 0.03) 0%, rgba(237, 237, 237, 0.03) 22%,rgba(126, 126, 126, 0.03) 22%, rgba(126, 126, 126, 0.03) 55%,rgba(196, 196, 196, 0.03) 55%, rgba(196, 196, 196, 0.03) 61%,rgba(121, 121, 121, 0.03) 61%, rgba(121, 121, 121, 0.03) 71%,rgba(133, 133, 133, 0.03) 71%, rgba(133, 133, 133, 0.03) 84%,rgba(132, 132, 132, 0.03) 84%, rgba(132, 132, 132, 0.03) 97%,rgba(185, 185, 185, 0.03) 97%, rgba(185, 185, 185, 0.03) 100%),linear-gradient(124deg, rgba(168, 168, 168, 0.03) 0%, rgba(168, 168, 168, 0.03) 7%,rgba(169, 169, 169, 0.03) 7%, rgba(169, 169, 169, 0.03) 19%,rgba(73, 73, 73, 0.03) 19%, rgba(73, 73, 73, 0.03) 50%,rgba(150, 150, 150, 0.03) 50%, rgba(150, 150, 150, 0.03) 67%,rgba(68, 68, 68, 0.03) 67%, rgba(68, 68, 68, 0.03) 81%,rgba(111, 111, 111, 0.03) 81%, rgba(111, 111, 111, 0.03) 91%,rgba(191, 191, 191, 0.03) 91%, rgba(191, 191, 191, 0.03) 100%),linear-gradient(95deg, rgba(147, 147, 147, 0.03) 0%, rgba(147, 147, 147, 0.03) 17%,rgba(79, 79, 79, 0.03) 17%, rgba(79, 79, 79, 0.03) 27%,rgba(28, 28, 28, 0.03) 27%, rgba(28, 28, 28, 0.03) 45%,rgba(27, 27, 27, 0.03) 45%, rgba(27, 27, 27, 0.03) 56%,rgba(228, 228, 228, 0.03) 56%, rgba(228, 228, 228, 0.03) 64%,rgba(38, 38, 38, 0.03) 64%, rgba(38, 38, 38, 0.03) 72%,rgba(42, 42, 42, 0.03) 72%, rgba(42, 42, 42, 0.03) 100%),linear-gradient(346deg, rgba(59, 59, 59, 0.03) 0%, rgba(59, 59, 59, 0.03) 16%,rgba(66, 66, 66, 0.03) 16%, rgba(66, 66, 66, 0.03) 20%,rgba(236, 236, 236, 0.03) 20%, rgba(236, 236, 236, 0.03) 41%,rgba(244, 244, 244, 0.03) 41%, rgba(244, 244, 244, 0.03) 55%,rgba(106, 106, 106, 0.03) 55%, rgba(106, 106, 106, 0.03) 61%,rgba(220, 220, 220, 0.03) 61%, rgba(220, 220, 220, 0.03) 63%,rgba(209, 209, 209, 0.03) 63%, rgba(209, 209, 209, 0.03) 100%),linear-gradient(124deg, rgba(255, 36, 0, 0.17), rgba(232, 29, 29, 0.17), rgba(232, 183, 29, 0.17), rgba(227, 232, 29, 0.17), rgba(29, 232, 64, 0.17), rgba(29, 221, 232, 0.17), rgba(43, 29, 232, 0.17), rgba(221, 0, 243, 0.17), rgba(221, 0, 243, 0.17))"
        >
            <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl flex outfit-900">
                    "Hey, I'm Chris"
                    <img
                        style="height: 4rem"
                        class="sm:ml-4"
                        src="https://wasm-cdn--solicitor-seal-13462.netlify.app/img/party-corgi.gif"
                        alt="party corgi rainbow animated"
                    />
                </h1>
                <p class="mt-6 text-xl text-indigo-100 max-w-3xl">
                    This is my digital garden, where I often build up new content. Some posts are sketches or in-progress while others are complete.
                </p>
            </div>
        </div>
    }
}

#[component]
fn Article(
    title: String,
    image_url: String,
    tags: Vec<Tag>,
) -> impl IntoView {
    view! {
        <article class="flex flex-col items-start justify-start">
        <div class="relative w-full">
        <img src={image_url} alt="" class="aspect-video w-full rounded bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[16/9]"/>
        <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
        </div>
        <div class="max-w-xl">
        <div class="mt-8 flex flex-wrap items-center gap-4 text-xs">
            // <time datetime="2020-03-16" class="text-gray-500">Mar 16, 2020</time>
            {
                tags.iter().map(|tag| view!{
                    <Tag tag=tag.clone() />
                }).collect_view()
            }
        </div>
        <div class="group relative">
            <h3 class="mt-3 text-lg/6 font-semibold text-indigo-100 group-hover:text-slate-100">
            <a href="#">
                <span class="absolute inset-0"></span>
                {title.clone()}
            </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm/6 text-slate-100">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>
        </div>
        </div>
    </article>
    }
}

#[derive(Clone)]
struct Tag {
    display_name: String,
    label: String,
}

impl Tag {
    fn color_ring(&self) -> &str {
        match self.label.deref() {
            "rust" => "ring-red-400",
            "bevy" => "ring-sky-400",
            "wasm" => "ring-indigo-400",
            _ => "ring-gray-800",
        }
    }
    fn color_fill(&self) -> &str {
        match self.label.deref() {
            "rust" => "fill-red-400",
            "bevy" => "fill-sky-400",
            "wasm" => "fill-indigo-400",
            _ => "fill-gray-800",
        }
    }
}

#[component]
fn tag(tag: Tag) -> impl IntoView {
    view! {
        <span class=format!("inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset {}", tag.color_ring())>
            <svg class=format!("size-1.5 {}", tag.color_fill()) viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" />
            </svg>
            {tag.display_name.clone()}
        </span>
    }
}
