use crate::components::sidebar::Sidebar;
use leptos::{either::Either, prelude::*};
// use sens8::button::*;

#[component]
fn BentoBox<'a>(
    #[prop(optional)] border_gradient: &'a str,
    bg: Option<&'a str>,
    image_header: Option<&'a str>,
    #[prop(default = 2.)] speed: f64,
    #[prop(default = 0.)] animation_offset: f64,
    children: Children,
) -> impl IntoView + 'a {
    let mut style = "".to_string();
    if !border_gradient.is_empty() {
        style.push_str("--border-gradient: ");
        style.push_str(border_gradient);
        style.push_str(" border-box; ");
    };
    if let Some(bg) = bg {
        style.push_str("--bg-grad: ");
        style.push_str(bg);
        style.push_str(" padding-box;");
    };
    let mut container_style = "".to_string();
    container_style.push_str("--border-speed: ");
    container_style.push_str(&speed.to_string());
    container_style.push(';');
    container_style.push_str("--offset: ");
    container_style.push_str(&animation_offset.to_string());
    container_style.push_str("s;");
    view! {
        <div style=container_style class="bento-container h-full">
            <div style=style class="bento-box h-full">

                {if let Some(src) = image_header {
                    Either::Left(view! {
                        <div
                        class="h-full w-full absolute bg-center bg-cover img-header"
                        style=format!("
                            background-image: url({});
                        ", src)></div>
                    })
                } else {
                    Either::Right(view! { "" })
                }}

                {children()}
            </div>
        </div>
    }
}

#[derive(Clone)]
struct BentoBoxContent<'a> {
    title: &'a str,
    content: &'a str,
    bg: Option<&'a str>,
    border_gradient: Option<&'a str>,
    speed: f64,
    offset: f64,
    center_title: bool,
    image_header: Option<&'a str>,
}
impl<'a> Default for BentoBoxContent<'a> {
    fn default() -> Self {
        Self {
            title: Default::default(),
            content: Default::default(),
            bg: Default::default(),
            border_gradient: Default::default(),
            speed: 2.,
            offset: 0.,
            center_title: false,
            image_header: None,
        }
    }
}

#[component]
pub fn IndexPage() -> impl IntoView {
    let boxes = RwSignal::new(
        vec![
            BentoBoxContent {
                title: "Bevy",
                content: "svg-bevy",
                bg: Some("linear-gradient(-45deg, #232326, #1e1e22)"),
                // bg: Some("url('')"),
                border_gradient: Some("conic-gradient( from calc(180deg + var(--angle)) at 50% 70%, #1e1e22, #ececec)"),
                image_header: Some("https://res.cloudinary.com/dilgcuzda/image/upload/v1723431989/thisweekinbevy/01J528TBS3A73AHPN9KHWGJ7T0.avif"),
                ..Default::default()
            },
            BentoBoxContent {
                title: "",
                content: "wasm",
                bg: None,
                // 38.0	30.0	92.0	#624DEA
                border_gradient: Some("conic-gradient( from calc(180deg + var(--angle)) at 50% 70%, #624DEA, #ded9fb)"),
                center_title: true,
                image_header: Some("https://wasm-cdn--solicitor-seal-13462.netlify.app/img/wasm-heading.avif"),
                offset: 1.,
                ..Default::default()
            },
            BentoBoxContent {
                title: "Shaders",
                content: "svg-art",
                bg: None,
                border_gradient: None,

                ..Default::default()
            },
            BentoBoxContent {
                title: "Rust Adventure",
                content: "learn something and do some rust stuff",
                bg: Some("linear-gradient(-45deg, #2e1e1e 0%, var(--ctp-base) 60%)"),
                border_gradient: Some("conic-gradient( from calc(180deg + var(--angle)) at 50% 70%, #2e1e1e, var(--ctp-red))"),
                speed: 10.,
                center_title: true,
                ..Default::default()
            },
            BentoBoxContent {
                title: "Something",
                content: "svg-hex",
                bg: None,
                border_gradient: Some("conic-gradient( from calc(180deg + var(--angle)) at 50% 70%, hsl(265, 55%, 30%), hsl(265, 55%, 60%))"),
                ..Default::default()
            },
            BentoBoxContent {
                title: "YouTube",
                content: "YouTube",
                bg: None,
                border_gradient: None,
                ..Default::default()
            },
            BentoBoxContent {
                title: "YouTube",
                content: "YouTube",
                bg: None,
                border_gradient: Some("conic-gradient(
                    from calc(180deg + var(--angle)) at 50% 70%,
                    #e8b71d55,
                    #e81d1d55,
                    #ff240055
                    )"),
                    ..Default::default()
            },
            BentoBoxContent {
                title: "YouTube",
                content: "YouTube",
                bg: None,
                border_gradient: None,
                ..Default::default()
            },
        ]
        .into_iter()
        .enumerate()
        .collect::<Vec<(usize, BentoBoxContent)>>(),
    );
    view! {
        <Sidebar>
            // <Header slot>
                <Hero/>
            // </Header>
            <div class="grid grid-cols-3 gap-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-14">
                <For
                    // a function that returns the items we're iterating over; a signal is fine
                    each=move || boxes.get()
                    // a unique key for each item
                    key=|boxy| boxy.0.to_string()
                    // renders each item to a view
                    // min-h-24 min-h-32 min-h-36 min-h-16 min-h-64
                    children=move |(index, content)| {
                        view! {
                            <div class=format!(
                                "row-span-1 {}",
                                if index == 3 || index == 6 { "col-span-2" } else { "" },
                            )>

                                <BentoBox
                                    border_gradient=content.border_gradient.unwrap_or("")
                                    bg=content.bg
                                    speed=content.speed
                                    image_header=content.image_header
                                    animation_offset=0.1 * index as f64
                                >
                                    <p class=format!(
                                        "text-2xl font-bold leading-7 text-indigo-100 sm:truncate sm:text-3xl sm:tracking-tight {}",
                                        if content.center_title { "text-center" } else { "" },
                                    )>{content.title}</p>

                                    {if content.content == "svg-art" {
                                        view! { <span class="text-indigo-100">wgpu and wgsl</span> }
                                            .into_any()
                                    } else if content.content == "svg-hex" {
                                        view! {
                                            <span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 800 800"
                                                >
                                                    <defs>
                                                        <filter
                                                            id="b"
                                                            width="400%"
                                                            height="400%"
                                                            x="-100%"
                                                            y="-100%"
                                                            color-interpolation-filters="sRGB"
                                                            filterUnits="objectBoundingBox"
                                                            primitiveUnits="userSpaceOnUse"
                                                        >
                                                            <feGaussianBlur
                                                                width="100%"
                                                                height="100%"
                                                                x="0%"
                                                                y="0%"
                                                                in="SourceGraphic"
                                                                result="blur"
                                                                stdDeviation="17 8"
                                                            ></feGaussianBlur>
                                                        </filter>
                                                        <filter
                                                            id="c"
                                                            width="400%"
                                                            height="400%"
                                                            x="-100%"
                                                            y="-100%"
                                                            color-interpolation-filters="sRGB"
                                                            filterUnits="objectBoundingBox"
                                                            primitiveUnits="userSpaceOnUse"
                                                        >
                                                            <feGaussianBlur
                                                                width="100%"
                                                                height="100%"
                                                                x="0%"
                                                                y="0%"
                                                                in="SourceGraphic"
                                                                result="blur"
                                                                stdDeviation="10 17"
                                                            ></feGaussianBlur>
                                                        </filter>
                                                        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
                                                            <stop offset="0%" stop-color="hsl(265, 55%, 30%)"></stop>
                                                            <stop offset="100%" stop-color="hsl(265, 55%, 60%)"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                    <g fill="none" stroke="url(#a)" stroke-width="16">
                                                        <path
                                                            d="M388.453 233.461a23.095 23.095 0 0 1 23.094.001l126.906 73.27A23.093 23.093 0 0 1 550 326.73v146.538c0 8.25-4.402 15.875-11.547 20l-126.906 73.27a23.095 23.095 0 0 1-23.094-.001l-126.906-73.27A23.093 23.093 0 0 1 250 473.27V326.731c0-8.25 4.402-15.875 11.547-20l126.906-73.27Z"
                                                            filter="url(#b)"
                                                        ></path>
                                                        <path
                                                            d="M400.453 233.461a23.095 23.095 0 0 1 23.094.001l126.906 73.27A23.093 23.093 0 0 1 562 326.73v146.538c0 8.25-4.402 15.875-11.547 20l-126.906 73.27a23.095 23.095 0 0 1-23.094-.001l-126.906-73.27A23.093 23.093 0 0 1 262 473.27V326.731c0-8.25 4.402-15.875 11.547-20l126.906-73.27Z"
                                                            filter="url(#c)"
                                                            opacity=".25"
                                                        ></path>
                                                        <path
                                                            d="M376.453 233.461a23.095 23.095 0 0 1 23.094.001l126.906 73.27A23.093 23.093 0 0 1 538 326.73v146.538c0 8.25-4.402 15.875-11.547 20l-126.906 73.27a23.095 23.095 0 0 1-23.094-.001l-126.906-73.27A23.093 23.093 0 0 1 238 473.27V326.731c0-8.25 4.402-15.875 11.547-20l126.906-73.27Z"
                                                            filter="url(#c)"
                                                            opacity=".25"
                                                        ></path>
                                                        <path d="M388.453 233.461a23.095 23.095 0 0 1 23.094.001l126.906 73.27A23.093 23.093 0 0 1 550 326.73v146.538c0 8.25-4.402 15.875-11.547 20l-126.906 73.27a23.095 23.095 0 0 1-23.094-.001l-126.906-73.27A23.093 23.093 0 0 1 250 473.27V326.731c0-8.25 4.402-15.875 11.547-20l126.906-73.27Z"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        }
                                            .into_any()
                                    } else if content.content == "svg-bevy" {
                                        view! { <span>game development</span> }.into_any()
                                    } else if content.content == "wasm" {
                                        view! {
                                            <div class="visible-on-hover text-slate-900">
                                                <h2 class="outfit-900">
                                                    <a href="/wasm" class="focus:outline-none">
                                                        <span
                                                            class="absolute inset-0 z-1"
                                                            aria-hidden="true"
                                                        ></span>
                                                        Wasm
                                                    </a>
                                                </h2>
                                                <span class="drop-shadow-2xl">
                                                    Webassembly, Leptos, Rust, and more...
                                                </span>
                                            </div>
                                        }
                                            .into_any()
                                    } else {
                                        view! {
                                            <span>
                                                // <p class="text-ctp-text">{content.content}</p>
                                                <svg></svg>
                                            </span>
                                        }
                                            .into_any()
                                    }}

                                </BentoBox>
                            </div>
                        }
                    }
                />

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
                    I am an independent Software Engineer specializing in
                    <a class="text-red-400" href="/rust">Rust</a> and
                    <span class="text-[#EAD54D]">JavaScript</span>, programming communicator, educator, and a
                    <a href="https://www.youtube.com/@chrisbiscardi" class="text-[#ff0000]">YouTuber</a>.
                </p>
                <p class="mt-6 text-large text-indigo-100 max-w-3xl">
                    I maintain <a href="https://www.rustadventure.dev/" class="text-red-400">Rust Adventure</a>:
                    a collection of workshops and practical projects you can use to learn Rust
                    and <a href="https://thisweekinbevy.com/" class="text-sky-400">This Week in Bevy</a>,
                     a curated roundup covering week-to-week activity in the Bevy ecosystem.
                </p>
                <p class="mt-6 text-large text-indigo-100 max-w-3xl">
                    You can reach me for educational and software development services via email:<br/> <code>chris at christopherbiscardi.com</code>
                </p>
                <p class="mt-6 text-large text-indigo-100 max-w-3xl">
                    This site is built with <a href="" class="text-[#F04948]">Leptos</a> and
                    <a href="" class="text-[#a598f6]">Wasm</a>.
                </p>
                <ul class="flex py-4 gap-x-2 mt-4">
                    <li>
                        <a
                            href="https://bsky.app/profile/chrisbiscardi.bsky.social"
                            class="inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-indigo-100 shadow-sm ring-1 ring-inset ring-[#0085FF] hover:bg-[#0085ff24]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                viewBox="0 0 600 520"
                                class="-ml-0.5 size-5"
                                ><path fill="#1185fe" d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 9.997 86.535 9.997 68.825c0-88.687 77.742-60.816 125.72-24.795z"/></svg>
                            <span>Bluesky</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.youtube.com/@chrisbiscardi"
                            class="inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-indigo-100 shadow-sm ring-1 ring-inset ring-[#ff0000] hover:bg-[#ff000024]">

                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="15px" viewBox="0 0 23 17"
                            class="-ml-0.5 size-5"
                            ><path fill="#ff0000" d="M11.6907099,0.0578178602 C12.6060128,0.0605977646 16.7071801,0.0845049419 19.5514615,0.290106667 C20.0010348,0.343730208 20.981381,0.348267917 21.8559848,1.26434354 C22.5455679,1.96230729 22.770321,3.54726604 22.770321,3.54726604 C22.770321,3.54726604 23,5.4085075 23,7.26974417 L23,7.26974417 L23,9.01466312 C23,10.8758806 22.7703258,12.7371221 22.7703258,12.7371221 C22.7703258,12.7371221 22.5455727,14.3220856 21.8559896,15.0200494 C20.9813858,15.936125 20.0010348,15.9406531 19.5514663,15.9942862 C16.5574858,16.2107047 12.1665218,16.232102 11.5684023,16.2340342 L11.4899859,16.2341208 C11.2176094,16.2315455 5.47631882,16.1754125 3.68008625,16.00317 C3.16820688,15.9071594 2.01894,15.936125 1.14401521,15.0200494 C0.4544225,14.3220904 0.230019167,12.7371221 0.230019167,12.7371221 C0.230019167,12.7371221 0,10.8758806 0,9.01466312 L0.000994600165,7.05509197 C0.0160444711,5.41104868 0.197244917,3.82302118 0.226140669,3.57945865 L0.230014375,3.54726604 C0.230014375,3.54726604 0.454417708,1.96230729 1.14401042,1.26434354 C2.01893521,0.348267917 2.99893167,0.343730208 3.44853375,0.290106667 C6.29290408,0.0845049419 10.3940069,0.0605977646 11.3092935,0.0578178602 Z M9.12446896,4.66678625 L9.12552313,11.1291777 L15.3391744,7.90924 L9.12446896,4.66678625 Z"></path></svg>
                            <span>YouTube</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    }
}
