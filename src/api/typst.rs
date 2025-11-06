#[cfg(feature = "ssr")]
use duct::cmd;
use leptos::*;
use prelude::ServerFnError;
#[cfg(feature = "ssr")]
use scraper::{Html, Selector};
use serde::{Deserialize, Serialize};
#[cfg(feature = "ssr")]
use std::{error::Error, io::Cursor, path::Path};

#[cfg(feature = "ssr")]
use crate::api::markdown::ContentMetadata;

#[cfg(feature = "ssr")]
const NIGHT_OWL: &[u8; 27913] =
    include_bytes!("../night_owl/night-owlish.tmtheme");

#[cfg(feature = "ssr")]
const HTML_WARNING: &str = "warning: html export is under active development and incomplete
 = hint: its behaviour may change at any time
 = hint: do not rely on this feature for production use cases
 = hint: see https://github.com/typst/typst/issues/5512 for more information";

#[cfg(feature = "ssr")]
pub fn compile(
    input: &str,
) -> Result<String, Box<dyn Error>> {
    use owo_colors::OwoColorize;

    let typst_io = cmd!(
        "typst",
        "compile",
        "--features",
        "html",
        "--format",
        "html",
        "-",
        "-"
    )
    .dir(std::env::current_dir().unwrap())
    .stdin_bytes(input)
    .stderr_capture()
    .stdout_capture()
    .run()?;

    // Temporary solution to hide the Typst "html is
    // experimental" warning
    match str::from_utf8(&typst_io.stderr) {
        Ok(stderr) => {
            let trimmed_error = stderr
                .trim_start_matches(HTML_WARNING)
                .trim();
            if !trimmed_error.is_empty() {
                eprintln!("test {}", trimmed_error.red());
            }
        }
        Err(err) => {
            eprintln!(
                "typst file encountered an error {err:?}"
            );
        }
    };

    let fragment = Html::parse_document(str::from_utf8(
        typst_io.stdout.as_slice(),
    )?);

    let selector = Selector::parse("body")?;

    let body = fragment.select(&selector).next().ok_or(
        "couldn't find a body; where'd you hide it?",
    )?;
    Ok(body.inner_html())
}

#[server(TypstCompileServer, "/api")]
pub async fn typst_compile_server(
    code: String,
) -> Result<String, ServerFnError> {
    compile(&code).map_err(|err| {
        ServerFnError::ServerError(err.to_string())
    })
}

#[cfg(feature = "ssr")]
pub fn parse_frontmatter(
    input: &str,
) -> Option<ContentMetadata> {
    use owo_colors::OwoColorize;
    let typst_io = cmd!(
        "typst",
        "query",
        "--features",
        "html",
        "--target",
        "html",
        "-",
        "<frontmatter>",
    )
    .dir(std::env::current_dir().unwrap())
    .stdin_bytes(input)
    .stderr_capture()
    .stdout_capture()
    .unchecked()
    .run()
    .inspect_err(|err| {
        leptos::logging::error!("{:?}", err.red());
    })
    .ok()?;

    // Temporary solution to hide the Typst "html is
    // experimental" warning
    match str::from_utf8(&typst_io.stderr) {
        Ok(stderr) => {
            let trimmed_error = stderr
                .trim_start_matches(HTML_WARNING)
                .trim();
            if !trimmed_error.is_empty() {
                eprintln!("test {}", trimmed_error.red());
            }
        }
        Err(err) => {
            eprintln!(
                "typst file encountered an error {err:?}"
            );
        }
    };

    if !typst_io.status.success() {
        // typst command wasn't successful, Probably a
        // failure instead of a None tbh
        return None;
    }

    let mut result: Vec<TypstObject<TypstFrontmatter>> =
        serde_json::from_reader(typst_io.stdout.as_slice())
            .unwrap();
    // dbg!(&result);

    let metadata = result.remove(0).value;

    // let metadata = ContentMetadata {
    //     title: get_string(&doc, "title"),
    //     slug: get_string(&doc, "slug"),
    //     published: get_string(&doc, "published"),
    //     byline: get_string(&doc, "byline"),
    //     image_url: get_string(&doc, "image_url"),
    //     tags: doc
    //         .get("tags")
    //         .and_then(|node| {
    //             node.iter()
    //                 .map(|entry| {
    //                     entry
    //                         .value()
    //                         .as_string()
    //                         .map(|value|
    // value.to_string())                 })
    //                 .collect()
    //         })
    //         .unwrap_or(vec![]),
    // };

    // Ok((input, Some(metadata)))
    Some(ContentMetadata {
        title: Some(metadata.title),
        slug: Some(metadata.slug),
        byline: Some(metadata.byline),
        image_url: metadata.image_url,
        tags: metadata.tags,
        published: metadata.published,
    })
}

#[derive(Debug, Serialize, Deserialize)]
struct TypstObject<T> {
    func: String,
    value: T,
    label: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct TypstFrontmatter {
    title: String,
    slug: String,
    tags: Vec<String>,
    byline: String,
    image_url: Option<String>,
    published: Option<String>,
}
