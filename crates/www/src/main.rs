// I think this is a macos linker issue
#![recursion_limit = "512"]

#[cfg(feature = "ssr")]
#[tokio::main]
async fn main() {
    use axum::Router;
    use leptos::{logging::log, prelude::*};
    use leptos_axum::{generate_route_list, LeptosRoutes};
    use www::app::*;

    let conf = get_configuration(None).unwrap();
    let addr = conf.leptos_options.site_addr;
    let leptos_options = conf.leptos_options;
    // Generate the list of routes in your Leptos App
    let routes = generate_route_list(App);

    let app = Router::new()
        .leptos_routes(&leptos_options, routes, {
            let leptos_options = leptos_options.clone();
            move || shell(leptos_options.clone())
        })
        .fallback(leptos_axum::file_and_error_handler(
            shell,
        ))
        .with_state(leptos_options);

    // run our app with hyper
    // `axum::Server` is a re-export of
    // `hyper::Server`
    log!("listening on http://{}", &addr);
    let listener =
        tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}

#[cfg(not(feature = "ssr"))]
pub fn main() {
    // no client-side main function
    // unless we want this to work with e.g.,
    // Trunk for pure client-side testing
    // see lib.rs for hydration function instead
}

// #[cfg(feature = "ssr")]
// pub fn file_and_error_handler<S, IV>(
//     shell: fn(LeptosOptions) -> IV,
// ) -> impl Fn(
//     Uri,
//     State<S>,
//     Request<Body>,
// ) -> Pin<
//     Box<
//         dyn Future<Output = Response<Body>>
//             + Send
//             + 'static,
//     >,
// > + Clone
//        + Send
//        + 'static
// where
//     IV: IntoView + 'static,
//     S: Send + 'static,
//     LeptosOptions: FromRef<S>,
// {
//     // use axum::http::Uri;
//     // use axum::{
//     //     body::{Body, Bytes},
//     //     extract::{
//     //         FromRef, FromRequestParts,
// MatchedPath,     // State,     },
//     //     http::{
//     //         header::{
//     //             self, HeaderName,
// HeaderValue,     // ACCEPT,
// LOCATION, REFERER,     //         },
//     //         request::Parts,
//     //         HeaderMap, Method, Request,
// Response,     //         StatusCode,
//     //     },
//     //     response::IntoResponse,
//     //     routing::{delete, get, patch, post,
// put},     // };

//     // use dashmap::DashMap;
//     // use futures::{
//     //     stream::once, Future, Stream,
// StreamExt,     // };
//     // use hydration_context::SsrSharedContext;
//     // use leptos::{
//     //     config::LeptosOptions,
//     //     context::{provide_context,
// use_context},     //     prelude::*,
//     //     reactive::{computed::ScopedFuture,
//     // owner::Owner},     IntoView,
//     // };
//     // use leptos_integration_utils::{
//     //     BoxedFnOnce, ExtendResponse,
// PinnedFuture,     //     PinnedStream,
//     // };
//     // use leptos_meta::ServerMetaContext;

//     // use
// leptos_router::static_routes::ResolvedStaticPath;
//     // use leptos_router::{
//     //     components::provide_server_redirect,
//     //     location::RequestUrl,
//     //     static_routes::{RegenerationFn,
//     // StaticParamsMap},     PathSegment,
//     // RouteList, RouteListing, SsrMode, };

//     // use server_fn::{
//     //     redirect::REDIRECT_HEADER,
// ServerFnError,     // };

//     // use std::path::Path;
//     // use std::{fmt::Debug, io, pin::Pin,
// sync::Arc};

//     // use tower::util::ServiceExt;

//     // use tower_http::services::ServeDir;

//     move |uri: Uri,
//           State(options): State<S>,
//           req: Request<Body>| {
//         Box::pin(async move {
//             let options =
// LeptosOptions::from_ref(&options);
// let res = leptos_axum::get_static_file(
//                 uri,
//                 &options.site_root,
//             );
//             let res = res.await.unwrap();

//             res.into_response()
//         })
//     }
// }
