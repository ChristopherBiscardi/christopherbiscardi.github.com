use crate::{
    api::markdown::ContentMetadata,
    components::*,
    routes::{
        garden::GardenPage, index::IndexPage,
        slug::SlugPage,
    },
};
use futures::{channel::mpsc, Stream};
use leptos::{
    logging::{error, warn},
    prelude::*,
};
use leptos_meta::{
    provide_meta_context, HashedStylesheet, MetaTags, Title,
};
use leptos_router::{
    components::{Route, Router, Routes},
    path,
    static_routes::StaticRoute,
    SsrMode,
};
use std::path::Path;

pub fn shell(options: LeptosOptions) -> impl IntoView {
    let Ok(root) = std::env::var("CDN_PATH") else {
        panic!("Must set CDN_PATH env var")
    };
    view! {
        <!DOCTYPE html>
        <html lang="en" class="h-full bg-slate-50 dark:bg-slate-950">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <AutoReload options=options.clone()/>
                <HydrationScripts options=options.clone() root=root.clone() islands=true/>
                <MetaTags/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
                    rel="stylesheet"
                />
                <HashedStylesheet options=options root=root/>
            </head>
            <body class="h-full">
                <App/>
            </body>
        </html>
    }
}

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets,
    // titles, meta tags, etc.
    provide_meta_context();
    view! {
        <Title text="Chris Biscardi"/>

        <ProgressBar/>

        <Router>
            <Routes fallback=|| "Page not found.".into_view()
            transition=true
            >
                <Route
                    path=path!("/")
                    view=IndexPage
                    ssr=SsrMode::Static(
                        StaticRoute::new().regenerate(|_| watch_path(Path::new("./content"))),
                    )
                />
                <Route
                    path=path!("/garden")
                    view=GardenPage
                    ssr=SsrMode::Static(
                        StaticRoute::new().regenerate(|_| watch_path(Path::new("./content"))),
                    )
                />
                <Route
                    path=path!("/:slug")
                    view=SlugPage
                    ssr=SsrMode::Static(
                        StaticRoute::new()
                            .prerender_params(|| async move {
                                [("slug".into(), list_slugs().await.unwrap_or_default())]
                                    .into_iter()
                                    .collect()
                            })
                            .regenerate(|params| {
                                let slug = params.get("slug").unwrap();
                                watch_path(Path::new(&format!("./content/{slug}/main.typ")))
                            }),
                    )
                />
            </Routes>
        </Router>
    }
}

#[allow(unused)] // path is not used in non-SSR
fn watch_path(path: &Path) -> impl Stream<Item = ()> {
    #[allow(unused)]
    let (mut tx, rx) = mpsc::channel(0);

    #[cfg(feature = "ssr")]
    {
        use notify::{RecursiveMode, Watcher};

        let mut watcher = notify::recommended_watcher(
            move |res: Result<_, _>| {
                if res.is_ok() {
                    // if this fails, it's because the
                    // buffer is full
                    // this means we've already notified
                    // before it's regenerated,
                    // so this page will be queued for
                    // regeneration already
                    _ = tx.try_send(());
                }
            },
        )
        .expect("could not create watcher");

        // Add a path to be watched. All files and
        // directories at that path and below will
        // be monitored for changes.
        watcher
            .watch(path, RecursiveMode::NonRecursive)
            .expect("could not watch path");

        // we want this to run as long as the server is
        // alive
        std::mem::forget(watcher);
    }

    rx
}
#[server]
pub async fn list_slugs(
) -> Result<Vec<String>, ServerFnError> {
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
    for post_meta in published_posts
        .extract_if(.., |meta| meta.published.is_none())
    {
        println!("removing {:?} because it does not have a publish date", post_meta.slug)
    }

    Ok(published_posts
        .iter()
        .filter_map(|meta| {
            meta.published
                .as_ref()
                .and_then(|_| meta.slug.clone())
        })
        .collect())
}
