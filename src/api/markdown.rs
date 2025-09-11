#[cfg(feature = "ssr")]
use comrak::plugins::syntect::SyntectAdapterBuilder;
#[cfg(feature = "ssr")]
use comrak::{
    markdown_to_html_with_plugins, ComrakOptions,
    ComrakPlugins,
};
use leptos::*;
use nom::bytes::complete::take_until;
use prelude::ServerFnError;
use serde::{Deserialize, Serialize};
#[cfg(feature = "ssr")]
use std::io::Cursor;
#[cfg(feature = "ssr")]
use syntect::highlighting::ThemeSet;

#[cfg(feature = "ssr")]
const NIGHT_OWL: &[u8; 27913] =
    include_bytes!("../night_owl/night-owlish.tmtheme");

#[cfg(feature = "ssr")]
pub fn compile(input: &str) -> String {
    // let adapter = SyntectAdapter::new("Solarized
    // (dark)");
    let mut cursor = Cursor::new(NIGHT_OWL);

    let theme_night_owl =
        ThemeSet::load_from_reader(&mut cursor)
            .expect("expect markdown theme to be loadable");
    let mut theme_set = ThemeSet::new();
    theme_set
        .themes
        .entry("Night Owl".to_string())
        .or_insert(theme_night_owl);
    // let theme_set = ;
    let adapter = SyntectAdapterBuilder::new()
        .theme_set(theme_set)
        .theme("Night Owl")
        .build();
    let mut plugins = ComrakPlugins::default();
    plugins.render.codefence_syntax_highlighter =
        Some(&adapter);
    let mut options = ComrakOptions::default();
    // UNSAFE HTML TAGS!
    options.render.unsafe_ = false;
    // extensions, like those on github
    options.extension.strikethrough = true;
    options.extension.tagfilter = true;
    options.extension.table = true;
    options.extension.autolink = false;
    options.extension.tasklist = true;
    options.extension.superscript = true;
    options.extension.header_ids = None;
    options.extension.footnotes = true;
    options.extension.description_lists = false;
    options.extension.front_matter_delimiter =
        Some("---".to_owned());
    options.extension.multiline_block_quotes = true;

    markdown_to_html_with_plugins(input, &options, &plugins)
}

#[server(MarkdownCompileServer, "/api")]
pub async fn markdown_compile_server(
    code: String,
) -> Result<String, ServerFnError> {
    Ok(compile(&code))
}

#[derive(
    Clone,
    Debug,
    PartialEq,
    Eq,
    Serialize,
    Deserialize,
    Default,
)]
pub struct ContentMetadata {
    pub title: Option<String>,
    pub slug: Option<String>,
    pub byline: Option<String>,
    pub image_url: Option<String>,
    pub tags: Vec<String>,
    pub published: Option<String>,
}
#[cfg(feature = "ssr")]
pub fn parse_frontmatter(
    input: &str,
) -> nom::IResult<&str, Option<ContentMetadata>> {
    let (input, _) =
        nom::bytes::complete::tag("---")(input)?;
    let (input, output) = take_until("---")(input)?;

    // parse doc, returning None if unable to
    let Ok(doc) = output.parse() else {
        return Ok((input, None));
    };

    let metadata = ContentMetadata {
        title: get_string(&doc, "title"),
        slug: get_string(&doc, "slug"),
        published: get_string(&doc, "published"),
        byline: get_string(&doc, "byline"),
        image_url: get_string(&doc, "image_url"),
        tags: doc
            .get("tags")
            .and_then(|node| {
                node.iter()
                    .map(|entry| {
                        entry
                            .value()
                            .as_string()
                            .map(|value| value.to_string())
                    })
                    .collect()
            })
            .unwrap_or(vec![]),
    };

    Ok((input, Some(metadata)))
}

fn get_string(
    doc: &kdl::KdlDocument,
    key: &str,
) -> Option<String> {
    doc.get(key)
        .and_then(|node| node.entry(0))
        .map(|entry| entry.value())
        .and_then(|value| value.as_string())
        .map(|value| value.to_string())
}
