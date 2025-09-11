use crate::{
    components::*,
    routes::{
        garden::GardenPage, index::IndexPage,
        slug::SlugPage,
    },
};
use futures::{channel::mpsc, Stream};
use leptos::prelude::*;
use leptos_meta::{
    provide_meta_context, HashedStylesheet, MetaTags, Title,
};
use leptos_router::{
    components::{Route, Router, Routes},
    path,
    static_routes::StaticRoute,
    SsrMode, StaticSegment,
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
            <Routes fallback=|| "Page not found.".into_view()>
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
                                watch_path(Path::new(&format!("./content/{slug}.md")))
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

    let files = ReadDirStream::new(
        fs::read_dir("./content").await?,
    );
    Ok(files
        .filter_map(|entry| {
            let entry = entry.ok()?;
            let path = entry.path();
            if !path.is_file() {
                return None;
            }
            let extension = path.extension()?;
            if extension != "md" {
                return None;
            }

            let slug = path
                .file_name()
                .and_then(|n| n.to_str())
                .unwrap_or_default()
                .replace(".md", "");
            Some(slug)
        })
        .collect()
        .await)
}
