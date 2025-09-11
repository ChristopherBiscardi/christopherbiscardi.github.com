use leptos::prelude::*;
// use serde::{Deserialize, Serialize};

const SOLID_CLASSES: &str = concat!(
    "rounded-md",
    " ",
    // "bg-indigo-600",
    " ",
    "px-2.5",
    " ",
    "py-1.5",
    " ",
    "text-sm",
    " ",
    "font-semibold",
    " ",
    // "text-ctp-text",
    " ",
    "shadow-sm",
    " ",
    // "hover:bg-indigo-500",
    " ",
    "focus-visible:outline",
    " ",
    "focus-visible:outline-2",
    " ",
    "focus-visible:outline-offset-2",
    " ",
    // "focus-visible:outline-indigo-600",
);

#[component]
pub fn Button(
    #[prop(optional)] variant: Variant,
    color: ButtonColor,
    #[prop(into)] on_click: Callback<(), ()>,
    children: Children,
) -> impl IntoView {
    let classes = match variant {
        Variant::Solid => {
            format!("{SOLID_CLASSES} {} hover:bg-white/10, focus-visible:outline-{} text-white dark:text-black", color.bg(), color.as_str())
        }
        Variant::Outline => todo!(),
        Variant::Ghost => todo!(),
    };

    view! {
        <button type="button" on:click=move |_| on_click.run(()) class=classes>
            {children()}
        </button>
    }
}

#[derive(Default)]
pub enum Variant {
    #[default]
    Solid,
    Outline,
    Ghost,
}

pub enum ButtonColor {
    ROSEWATER,
    FLAMINGO,
    PINK,
    MAUVE,
    RED,
    MAROON,
    PEACH,
    YELLOW,
    GREEN,
    TEAL,
    SKY,
    SAPPHIRE,
    BLUE,
    LAVENDER,
    // social colors
    TWITTER,
    YOUTUBE,
    MASTODON,
}

impl ButtonColor {
    fn bg(&self) -> &str {
        match self {
            ButtonColor::ROSEWATER => "bg-ctp-rosewater",
            ButtonColor::FLAMINGO => "bg-ctp-flamingo",
            ButtonColor::PINK => "bg-ctp-pink",
            ButtonColor::MAUVE => "bg-ctp-mauve",
            ButtonColor::RED => "bg-ctp-red",
            ButtonColor::MAROON => "bg-ctp-maroon",
            ButtonColor::PEACH => "bg-ctp-peach",
            ButtonColor::YELLOW => "bg-ctp-yellow",
            ButtonColor::GREEN => "bg-ctp-green",
            ButtonColor::TEAL => "bg-ctp-teal",
            ButtonColor::SKY => "bg-ctp-sky",
            ButtonColor::SAPPHIRE => "bg-ctp-sapphire",
            ButtonColor::BLUE => "bg-ctp-blue",
            ButtonColor::LAVENDER => "bg-ctp-lavender",

            ButtonColor::TWITTER => todo!(),
            ButtonColor::YOUTUBE => todo!(),
            ButtonColor::MASTODON => todo!(),
        }
    }
    fn as_str(&self) -> &str {
        match self {
            ButtonColor::ROSEWATER => "ctp-rosewater",
            ButtonColor::FLAMINGO => "ctp-flamingo",
            ButtonColor::PINK => "ctp-pink",
            ButtonColor::MAUVE => "ctp-mauve",
            ButtonColor::RED => "ctp-red",
            ButtonColor::MAROON => "ctp-maroon",
            ButtonColor::PEACH => "ctp-peach",
            ButtonColor::YELLOW => "ctp-yellow",
            ButtonColor::GREEN => "ctp-green",
            ButtonColor::TEAL => "ctp-teal",
            ButtonColor::SKY => "ctp-sky",
            ButtonColor::SAPPHIRE => "ctp-sapphire",
            ButtonColor::BLUE => "ctp-blue",
            ButtonColor::LAVENDER => "ctp-lavender",

            ButtonColor::TWITTER => todo!(),
            ButtonColor::YOUTUBE => todo!(),
            ButtonColor::MASTODON => todo!(),
        }
    }
    fn outline(&self) -> &str {
        match self {
            ButtonColor::ROSEWATER => "bg-ctp-rosewater",
            ButtonColor::FLAMINGO => "bg-ctp-flamingo",
            ButtonColor::PINK => "bg-ctp-pink",
            ButtonColor::MAUVE => "bg-ctp-mauve",
            ButtonColor::RED => "bg-ctp-red",
            ButtonColor::MAROON => "bg-ctp-maroon",
            ButtonColor::PEACH => "bg-ctp-peach",
            ButtonColor::YELLOW => "bg-ctp-yellow",
            ButtonColor::GREEN => "bg-ctp-green",
            ButtonColor::TEAL => "bg-ctp-teal",
            ButtonColor::SKY => "bg-ctp-sky",
            ButtonColor::SAPPHIRE => "bg-ctp-sapphire",
            ButtonColor::BLUE => "bg-ctp-blue",
            ButtonColor::LAVENDER => "bg-ctp-lavender",

            ButtonColor::TWITTER => todo!(),
            ButtonColor::YOUTUBE => todo!(),
            ButtonColor::MASTODON => todo!(),
        }
    }
}
