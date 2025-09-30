use crate::{
    api::markdown::ContentMetadata,
    components::sidebar::Sidebar,
};
use leptos::prelude::*;
use leptos_meta::{Link, Meta, Title};
use leptos_router::{hooks::*, params::Params};
use serde::{Deserialize, Serialize};
use thiserror::Error;
// use sens8::button::*;

#[derive(Params, PartialEq, Clone)]
struct SlugParams {
    slug: String,
}

#[derive(
    Error,
    Debug,
    Copy,
    Clone,
    PartialEq,
    Eq,
    Serialize,
    Deserialize,
)]
pub enum ContentError {
    #[error("Invalid slug.")]
    InvalidId,
    #[error("slug not found.")]
    SlugNotFound,
    #[error("Server error.")]
    ServerError,
}

#[component]
pub fn SlugPage() -> impl IntoView {
    let params = use_params::<SlugParams>();

    let slug = move || {
        params.with(|p| {
            p.as_ref()
                .map(|p| p.slug.clone())
                .map_err(|_| ContentError::InvalidId)
        })
    };
    let content_resource =
        Resource::new_blocking(slug, |slug| async move {
            match slug {
                Err(e) => Err(e),
                Ok(slug) => fetch_content(slug)
                    .await
                    .map(|data| {
                        data.ok_or(
                            ContentError::SlugNotFound,
                        )
                    })
                    .map_err(|_| ContentError::ServerError),
            }
        });

    let content_view = Suspend::new(async move {
        pub const PROSE: &str = r#"prose dark:prose-invert lg:prose-xl prose-slate  [&>h2]:leading-7 [&>h2]:pl-4 [&>ul]:mt-6 [&>ul]:list-['⮡\20'] [&>ul]:pl-5"#;

        match content_resource.await.to_owned() {
            Ok(Ok(content)) => {
                Ok(view! {
                    <Title text=content.meta.title.clone().unwrap_or("Article".to_string())/>
                    <Meta
                        name="description"
                        content=content.meta.byline.clone().unwrap_or("An article by Chris Biscardi".to_string())
                    />

                    <Link rel="canonical" href=format!("https://christopherbiscardi.com/{}", content.meta.slug.clone().unwrap_or("unknown".to_string()))/>
                    <Meta property="og:type" content="website"/>
                    <Meta property="og:url" content=format!("https://christopherbiscardi.com/{}", content.meta.slug.clone().unwrap_or("unknown".to_string()))/>
                    <Meta
                        property="og:image"
                        content=format!("https://christopherbiscardi.com{}", content.meta.image_url.clone().unwrap_or("/opengraph/main-opengraph-image.png".to_string()))
                    />
                    <Meta name="twitter:card" content="summary_large_image"/>
                    <Meta name="twitter:creator" content="@chrisbiscardi"/>
                    <Meta name="twitter:title" content=content.meta.title.clone().unwrap_or("Article".to_string())/>
                    <Meta
                        name="twitter:description"
                        content=content.meta.byline.clone().unwrap_or("An article by Chris Biscardi".to_string())
                    />

                    <Meta
                        name="twitter:image"
                        content=format!("https://christopherbiscardi.com{}", content.meta.image_url.clone().unwrap_or("/opengraph/main-opengraph-image.png".to_string()))
                    />
                    <Link rel="expect" href="#hero" blocking="render" />
                     // <Header slot>
                    <Hero
                        title=content.meta.title.unwrap_or("A Post".to_string())
                        byline=content.meta.byline.unwrap_or("".to_string())
                        slug=content.meta.slug.unwrap()
                    />
                // </Header>
                <div class="grid grid-cols-3 gap-4 mx-auto max-w-7xl sm:px-6 lg:px-8 py-14 text-slate-950 dark:text-white">
                    <div class=format!("col-span-full {PROSE} prose-smol") inner_html={content.html}/>
                    </div>
                    // <Title text=post.title/>
                    // <Meta name="description" content=post.content/>
                })
            }
            _ => Err(ContentError::ServerError),
        }
    });

    view! {
        <Sidebar>
        <Suspense fallback=move || view! { <p>"Loading post..."</p> }>
            <ErrorBoundary fallback=|errors| {
                view! {
                    <div class="error">
                        <h1>"Something went wrong."</h1>
                        <ul>
                            {move || {
                                errors
                                    .get()
                                    .into_iter()
                                    .map(|(_, error)| view! { <li>{error.to_string()}</li> })
                                    .collect::<Vec<_>>()
                            }}

                        </ul>
                    </div>
                }
            }>



            {content_view}



            </ErrorBoundary>
            </Suspense>
        </Sidebar>
    }
}

#[component]
pub fn Hero(
    title: String,
    byline: String,
    slug: String,
) -> impl IntoView {
    let Ok(root) = std::env::var("CDN_PATH") else {
        panic!("Must set CDN_PATH env var")
    };

    view! {
            <div
                id="hero"
                class="relative main-header-darken"
                style="background-image: linear-gradient(153deg, rgba(152, 152, 152, 0.03) 0%, rgba(152, 152, 152, 0.03) 9%,rgba(197, 197, 197, 0.03) 9%, rgba(197, 197, 197, 0.03) 21%,rgba(106, 106, 106, 0.03) 21%, rgba(106, 106, 106, 0.03) 32%,rgba(222, 222, 222, 0.03) 32%, rgba(222, 222, 222, 0.03) 72%,rgba(16, 16, 16, 0.03) 72%, rgba(16, 16, 16, 0.03) 92%,rgba(181, 181, 181, 0.03) 92%, rgba(181, 181, 181, 0.03) 97%,rgba(130, 130, 130, 0.03) 97%, rgba(130, 130, 130, 0.03) 100%),linear-gradient(39deg, rgba(237, 237, 237, 0.03) 0%, rgba(237, 237, 237, 0.03) 22%,rgba(126, 126, 126, 0.03) 22%, rgba(126, 126, 126, 0.03) 55%,rgba(196, 196, 196, 0.03) 55%, rgba(196, 196, 196, 0.03) 61%,rgba(121, 121, 121, 0.03) 61%, rgba(121, 121, 121, 0.03) 71%,rgba(133, 133, 133, 0.03) 71%, rgba(133, 133, 133, 0.03) 84%,rgba(132, 132, 132, 0.03) 84%, rgba(132, 132, 132, 0.03) 97%,rgba(185, 185, 185, 0.03) 97%, rgba(185, 185, 185, 0.03) 100%),linear-gradient(124deg, rgba(168, 168, 168, 0.03) 0%, rgba(168, 168, 168, 0.03) 7%,rgba(169, 169, 169, 0.03) 7%, rgba(169, 169, 169, 0.03) 19%,rgba(73, 73, 73, 0.03) 19%, rgba(73, 73, 73, 0.03) 50%,rgba(150, 150, 150, 0.03) 50%, rgba(150, 150, 150, 0.03) 67%,rgba(68, 68, 68, 0.03) 67%, rgba(68, 68, 68, 0.03) 81%,rgba(111, 111, 111, 0.03) 81%, rgba(111, 111, 111, 0.03) 91%,rgba(191, 191, 191, 0.03) 91%, rgba(191, 191, 191, 0.03) 100%),linear-gradient(95deg, rgba(147, 147, 147, 0.03) 0%, rgba(147, 147, 147, 0.03) 17%,rgba(79, 79, 79, 0.03) 17%, rgba(79, 79, 79, 0.03) 27%,rgba(28, 28, 28, 0.03) 27%, rgba(28, 28, 28, 0.03) 45%,rgba(27, 27, 27, 0.03) 45%, rgba(27, 27, 27, 0.03) 56%,rgba(228, 228, 228, 0.03) 56%, rgba(228, 228, 228, 0.03) 64%,rgba(38, 38, 38, 0.03) 64%, rgba(38, 38, 38, 0.03) 72%,rgba(42, 42, 42, 0.03) 72%, rgba(42, 42, 42, 0.03) 100%),linear-gradient(346deg, rgba(59, 59, 59, 0.03) 0%, rgba(59, 59, 59, 0.03) 16%,rgba(66, 66, 66, 0.03) 16%, rgba(66, 66, 66, 0.03) 20%,rgba(236, 236, 236, 0.03) 20%, rgba(236, 236, 236, 0.03) 41%,rgba(244, 244, 244, 0.03) 41%, rgba(244, 244, 244, 0.03) 55%,rgba(106, 106, 106, 0.03) 55%, rgba(106, 106, 106, 0.03) 61%,rgba(220, 220, 220, 0.03) 61%, rgba(220, 220, 220, 0.03) 63%,rgba(209, 209, 209, 0.03) 63%, rgba(209, 209, 209, 0.03) 100%),linear-gradient(124deg, rgba(255, 36, 0, 0.17), rgba(232, 29, 29, 0.17), rgba(232, 183, 29, 0.17), rgba(227, 232, 29, 0.17), rgba(29, 232, 64, 0.17), rgba(29, 221, 232, 0.17), rgba(43, 29, 232, 0.17), rgba(221, 0, 243, 0.17), rgba(221, 0, 243, 0.17))"
            >
    <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1
                    class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl flex outfit-900"
                    style=format!("view-transition-name: article-{slug}")
                    >
                        {title}
                        // <img
                        //     style="height: 4rem"
                        //     class="sm:ml-4"
                        //     src=format!("{root}/img/party-corgi.gif")
                        //     alt="party corgi rainbow animated"
                        // />
                    </h1>
                    <p class="mt-6 text-xl text-sky-100 max-w-3xl"
                    style=format!("view-transition-name: article-byline-{slug}")
                    >{byline}</p>
                </div>
                </div>
        }
}

#[derive(
    Clone, Debug, PartialEq, Eq, Serialize, Deserialize,
)]
pub struct Content {
    pub meta: ContentMetadata,
    pub html: String,
}

#[server]
async fn fetch_content(
    slug: String,
) -> Result<Option<Content>, ServerFnError> {
    use crate::api::markdown::{
        compile, parse_frontmatter,
    };

    println!("reading ./content/{slug}.md");
    let content = tokio::fs::read_to_string(&format!(
        "./content/{slug}.md"
    ))
    .await?;

    let Some(content_metadata) =
        parse_frontmatter(&content)
            .ok()
            .and_then(|(_, doc)| doc)
    else {
        return Ok(Some(Content {
            meta: ContentMetadata::default(),
            html: "".to_string(),
        }));
    };

    Ok(Some(Content {
        meta: content_metadata,
        html: compile(&content),
    }))
}
