use crate::{
    components::*,
    routes::{garden::GardenPage, index::IndexPage},
};
use leptos::prelude::*;
use leptos_meta::{
    provide_meta_context, HashedStylesheet, MetaTags, Title,
};
use leptos_router::{
    components::{Route, Router, Routes},
    StaticSegment,
};

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
                <Route path=StaticSegment("") view=IndexPage/>
                <Route path=StaticSegment("/garden") view=GardenPage/>
            </Routes>
        </Router>
    }
}
