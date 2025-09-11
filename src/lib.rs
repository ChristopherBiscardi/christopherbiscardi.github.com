#![recursion_limit = "256"]

use phf::phf_map;
use std::collections::HashMap;
mod api;
pub mod app;
mod components;
mod routes;

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn hydrate() {
    use app::*;
    console_error_panic_hook::set_once();
    // leptos::mount::hydrate_body(App);
    leptos::mount::hydrate_islands();
}

#[derive(Clone)]
struct Tag {
    display_name: &'static str,
    id: &'static str,
    color: &'static str,
}

impl Tag {
    fn color_ring(&self) -> &str {
        match self.id {
            "rust" => "ring-red-400",
            "bevy" => "ring-sky-400",
            "wasm" => "ring-indigo-400",
            _ => "ring-gray-800",
        }
    }
    fn color_fill(&self) -> &str {
        match self.id {
            "rust" => "fill-red-400",
            "bevy" => "fill-sky-400",
            "wasm" => "fill-indigo-400",
            _ => "fill-gray-800",
        }
    }
}

static TAGS: phf::Map<&'static str, Tag> = phf_map! {
    "rust" => Tag {
        id: "rust",
        display_name: "Rust",
        color: "#f87171",
    },
    "bevy" => Tag {
        id: "bevy",
        display_name: "Bevy",
        color: "#38bdf8",
    },
    "wasm" => Tag {
        id: "wasm",
        display_name: "Wasm",
        color: "#818cf8",
    },
};
