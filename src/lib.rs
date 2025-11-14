#![recursion_limit = "256"]

use phf::phf_map;
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
    display_name: String,
    id: String,
    color: String,
}

impl Tag {
    fn color_ring(&self) -> &str {
        match self.id.as_str() {
            "rust" => "ring-red-400",
            "bevy" => "ring-sky-400",
            "wasm" => "ring-indigo-400",
            "blender" => "ring-[#e87d0d]",
            _ => "ring-gray-800",
        }
    }
    fn color_fill(&self) -> &str {
        match self.id.as_str() {
            "rust" => "fill-red-400",
            "bevy" => "fill-sky-400",
            "wasm" => "fill-indigo-400",
            "blender" => "fill-[#e87d0d]",
            _ => "fill-gray-800",
        }
    }
    fn from_id(id: &str) -> Tag {
        match id {
            "rust" => Tag {
                id: "rust".to_owned(),
                display_name: "Rust".to_owned(),
                color: "#f87171".to_owned(),
            },
            "bevy" => Tag {
                id: "bevy".to_owned(),
                display_name: "Bevy".to_owned(),
                color: "#38bdf8".to_owned(),
            },
            "wasm" => Tag {
                id: "wasm".to_owned(),
                display_name: "Wasm".to_owned(),
                color: "#818cf8".to_owned(),
            },
            "blender" => Tag {
                id: "blender".to_owned(),
                display_name: "Blender".to_owned(),
                color: "#e87d0d".to_owned(),
            },
            _ => Tag {
                id: id.to_owned(),
                display_name: id.to_owned(),
                color: "".to_owned(),
            },
        }
    }
}
