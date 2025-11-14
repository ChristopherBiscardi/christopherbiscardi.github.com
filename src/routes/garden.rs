use crate::{api::markdown::ContentMetadata, Tag};

use crate::components::sidebar::Sidebar;
use leptos::{
    logging::{error, warn},
    prelude::*,
};
use leptos_meta::{Link, Meta, Title};
use serde::{Deserialize, Serialize};
use thiserror::Error;
// use sens8::button::*;

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
pub enum ArticlesError {
    #[error("Invalid slug.")]
    InvalidId,
    #[error("slug not found.")]
    SlugNotFound,
    #[error("Server error.")]
    ServerError,
}

#[component]
pub fn GardenPage() -> impl IntoView {
    let articles_resource =
        Resource::new_blocking(|| {}, |_| list_articles());

    let articles = Suspend::new(async move {
        match articles_resource.await.to_owned() {
            Ok(metadata) => {
                Ok(view! {
                    <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <For
                    each=move || metadata.clone()
                    key=|meta| meta.slug.as_ref().unwrap().clone()
                    // renders each item to a view
                    children=move |meta: ContentMetadata| {
                    view! {
                        <Article
                            title=meta.title.unwrap_or("TEST".to_string()).to_string()
                            slug=meta.slug.unwrap_or("nope".to_string())
                            image_url=meta.image_url.unwrap_or("/opengraph/main-opengraph-image.png".to_string())
                            tags=meta.tags.iter().map(|id| {
                                Tag::from_id(id)
                            }).collect()
                            description=meta.byline.unwrap_or("".to_string())
                            />
                        }
                        }
                    />

                    </div>
                </div>
                })
            }
            _ => Err(ArticlesError::ServerError),
        }
    });

    view! {
        <Sidebar>
        <Title text="Chris Biscardi"/>
        <Meta
            name="description"
            content="A collection of writing by Chris Biscardi"
        />

        <Link rel="canonical" href="https://christopherbiscardi.com/garden"/>
        <Meta property="og:type" content="website"/>
        <Meta property="og:url" content="https://christopherbiscardi.com/garden"/>
        <Meta
            property="og:image"
            content="/opengraph/main-opengraph-image.png"
        />
        <Meta name="twitter:card" content="summary_large_image"/>
        <Meta name="twitter:creator" content="@chrisbiscardi"/>
        <Meta name="twitter:title" content="Chris Biscardi"/>
        <Meta
            name="twitter:description"
            content="A collection of writing by Chris Biscardi"
        />

        <Meta
            name="twitter:image"
            content="/opengraph/main-opengraph-image.png"
        />
            <Hero/>
            <div class="pb-24 sm:pb-32">
            <Suspense fallback=move || view! { <p>"Loading posts..."</p> }>
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
            {articles}
            </ErrorBoundary>
            </Suspense>
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
                        src="/img/party-corgi.gif"
                        alt="party corgi rainbow animated"
                    />
                </h1>
                <p class="mt-6 text-xl text-sky-100 max-w-3xl">
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
    slug: String,
    description: String,
) -> impl IntoView {
    view! {
        <article class="flex flex-col items-start justify-start">

                <div class="relative w-full">
                <a
                href=format!("/{slug}")>
                <img src={image_url.clone()} alt="" class="aspect-video w-full rounded bg-gray-100 dark:bg-slate-950 object-cover sm:aspect-[2/1] lg:aspect-[16/9]"/>
                </a>
                </div>

        <div class="max-w-xl">
        <div class="mt-8 flex flex-wrap items-center gap-4 text-xs">
            // <time datetime="2020-03-16" class="text-gray-500">Mar 16, 2020</time>
            {
                tags.into_iter().map(|tag| view!{
                    <TagItem tag=tag />
                }).collect_view()
            }
        </div>
        <div class="group relative">
            <h3 class="mt-3 text-lg/6 font-semibold text-sky-900 group-hover:text-slate-950 dark:text-sky-100 dark:group-hover:text-slate-100">
            <a
                href=format!("/{slug}")
                style=format!("view-transition-name: article-{slug}")
            >
                <span class="absolute inset-0"></span>
                {title.clone()}
            </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm/6 text-slate-900 dark:text-slate-100"
            style=format!("view-transition-name: article-byline-{slug}")
            >{description}</p>
        </div>
        </div>
    </article>
    }
}

#[component]
fn TagItem(tag: Tag) -> impl IntoView {
    // let id = tag.id;
    let color_ring = tag.color_ring();
    let color_fill = tag.color_fill();
    let display_name = tag.display_name.clone();

    view! {
        // <a href=format!("/{}", &tag.id)
        <span
         class=format!("inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-950 dark:text-white ring-1 ring-inset {}", color_ring)>
            <svg class=format!("size-1.5 {}", color_fill) viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" />
            </svg>
            {display_name}
            </span>
        // </a>
    }
}

#[server]
pub async fn list_articles(
) -> Result<Vec<ContentMetadata>, ServerFnError> {
    use tokio::fs;
    use tokio_stream::{
        wrappers::ReadDirStream, StreamExt,
    };

    let mut files = ReadDirStream::new(
        fs::read_dir("./content").await?,
    );

    let mut published_posts: Vec<ContentMetadata> = vec![];

    while let Ok(Some(entry)) = files.try_next().await {
        // if entry is a directory, check for typst files
        // otherwise assume markdown
        if entry
            .file_type()
            .await
            .is_ok_and(|file_type| file_type.is_dir())
        {
            // is a dir, probably typst
            let path = entry.path().join("main.typ");

            let Ok(raw_file) =
                fs::read_to_string(&path).await
            else {
                error!("failed to read {:?}", path);
                continue;
            };

            let Some(meta) =
                crate::api::typst::parse_frontmatter(
                    &raw_file,
                )
            else {
                // No metadata, dropping
                warn!("failed to parse metadata for typst file: {}", path.display());
                continue;
            };

            published_posts.push(meta);
        } else {
            // is a file, probably markdown.
            let path = entry.path();

            // if extension isn't .md, continue
            if path
                .extension()
                .is_some_and(|ext| ext != "md")
            {
                continue;
            }

            let Ok(raw_file) =
                fs::read_to_string(&path).await
            else {
                error!("tried to read {:?}", path);
                continue;
            };

            if let Ok((_, output)) =
                crate::api::markdown::parse_frontmatter(
                    &raw_file,
                )
            {
                if let Some(output) = output {
                    published_posts.push(output);
                } else {
                    warn!("content metadata for X was empty, skipping");
                }
            } else {
                warn!("failed to parse frontmatter for markdown file: {}", path.display());
                continue;
            }
        };
    }
    // TODO: cfg flag to enable "unpublished" posts
    for post_meta in published_posts
        .extract_if(.., |meta| meta.published.is_none())
    {
        println!("removing {:?} because it does not have a publish date", post_meta.slug)
    }

    published_posts.sort_by(|a, b| {
        let format = time::macros::format_description!(
            "[year]-[month]-[day]"
        );
        let a_published = time::Date::parse(
            a.published.as_ref().unwrap(),
            &format,
        )
        .unwrap();
        let b_published = time::Date::parse(
            b.published.as_ref().unwrap(),
            &format,
        )
        .unwrap();
        b_published.cmp(&a_published)
    });
    Ok(published_posts)
}
