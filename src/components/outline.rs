use leptos::{logging::warn, prelude::*};
use leptos_use::{
    use_document, use_event_listener,
    use_event_listener_with_options, use_window,
    UseEventListenerOptions,
};

use crate::api::typst::{
    BodyTypes, HeadingBody, TypstHeadingEntry,
};

#[island]
pub fn Outline(
    // #[prop(optional)] header: Option<Header>,
    outline: Vec<TypstHeadingEntry>,
) -> impl IntoView {
    let (current_section, set_current_section) =
        signal("".to_string());
    let (positions, set_positions) = signal(vec![]);
    let mut outline_items: Vec<(_, Vec<_>)> = vec![];

    let outline_copy = outline.clone();
    Effect::new(move || {
        let mut pos = vec![];
        let Some(ref window) = *use_window() else {
            return;
        };
        let Some(ref document) = *use_document() else {
            return;
        };
        for heading in outline_copy.iter() {
            let Some(ref label) = heading.processed_label
            else {
                continue;
            };
            let Some(element) = document
                .get_element_by_id(label.trim_matches(
                    |c| c == '<' || c == '>',
                ))
            else {
                continue;
            };
            // let Ok(Some(style)) =
            //     window.get_computed_style(&element)
            // else {
            //     continue;
            // };
            // warn!(
            //     "{:?}",
            //     style.get_property_value(
            //         "scroll-margin-top"
            //     )
            // );
            let scroll_mt = 0.;
            let Ok(scroll_y) = window.scroll_y() else {
                continue;
            };
            let top = scroll_y
                + element.get_bounding_client_rect().top()
                - scroll_mt;

            pos.push((
                label
                    .trim_matches(|c| c == '<' || c == '>')
                    .to_string(),
                top,
            ));
        }
        set_positions(pos);
    });
    Effect::new(move || {
        let _ = use_event_listener_with_options(
            use_window(),
            leptos::ev::scroll,
            move |_| {
                let Some(ref window) = *use_window() else {
                    return;
                };
                let Ok(top) = window.scroll_y() else {
                    return;
                };
                let mut current = None;
                for (label, offset) in
                    positions.get().iter()
                {
                    if top >= offset - 100. {
                        current = Some(label.to_string());
                    } else {
                        break;
                    }
                }
                // warn!("setting current to {:?}",
                // current);
                set_current_section(
                    current
                        .map(|v| v.to_string())
                        .unwrap_or("".to_string()),
                );
            },
            UseEventListenerOptions::default()
                .passive(true),
        );
    });

    for item in outline
        .into_iter()
        .filter(|item| item.processed_label.is_some())
    {
        match item.level {
            1 => {
                outline_items.push((item, vec![]));
            }
            2 => {
                if let Some(v) = outline_items.last_mut() {
                    v.1.push(item);
                }
            }
            _ => {
                // ignoring
            }
        }
        // outline_items.
    }

    // let filtered_outline = outline
    //     .into_iter()
    //     .filter(|item| item.label.is_some())
    //     .collect::<Vec<_>>();

    view! {
        <div class="hidden xl:sticky xl:top-19 xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
            <nav aria-labelledby="on-this-page-title" class="w-56">
            <h2
                class="font-display text-sm font-medium text-slate-900 dark:text-white"
            >
                Outline
            </h2>
            <ol role="list" class="mt-4 space-y-3 text-sm">
                <For
                    // a function that returns the items we're iterating over; a signal is fine
                    each=move || outline_items.clone()
                    // a unique key for each item
                    key=|item| item.0.processed_label.clone()
                    // renders each item to a view
                    children=move |(entry, sub_items): (TypstHeadingEntry, Vec<_>)| {
                            let l = entry.processed_label.unwrap();
                            let label = l.trim_matches(|c| c == '<' || c == '>').to_string();

                            view! {
                                <li>
                                    <h3>
                                        <a
                                            href=format!("#{}",label.clone())
                                            class={
                                                let label = label.clone();
                                                move || {
                                                    format!("{}",
                                                    // if active
                                                        if current_section.get() == label {
                                                            "text-sky-500"
                                                        } else {
                                                            "font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                                        }
                                                    )
                                                }
                                            }
                                        >
                                        {
                                            match entry.body {
                                                BodyTypes::Text(HeadingBody{text}) => text,
                                                _ => label.to_string()
                                            }
                                        }
                                        </a>
                                    </h3>
                                    <ol
                                        role="list"
                                        class="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400" >
                                        <For
                                            // a function that returns the items we're iterating over; a signal is fine
                                            each=move || sub_items.clone()
                                            // a unique key for each item
                                            key=|item| item.processed_label.clone()
                                            // renders each item to a view
                                            children=move |entry: TypstHeadingEntry| {
                                                let l = entry.processed_label.unwrap();
                                                let label = l.trim_matches(|c| c == '<' || c == '>').to_string();
                                                view! {
                                                    <li>
                                                        <a
                                                            href=format!("#{}", label.clone())
                                                            class={
                                                                let label = label.clone();
                                                                move || {
                                                                if current_section.get() == label {
                                                                  "text-sky-500"
                                                                } else {
                                                                    "hover:text-slate-600 dark:hover:text-slate-300"
                                                                }
                                                            }
                                                                }
                                                        >
                                                        {
                                                            match entry.body {
                                                                BodyTypes::Text(HeadingBody{text}) => text,
                                                                _ => label.to_string()
                                                            }
                                                        }
                                                        </a>
                                                    </li>
                                                }
                                            }
                                        />
                                    </ol>
                                </li>
                            }
                        }
                    />
                </ol>
            </nav>
        </div>
    }
}

// {section.children.map((subSection) => (
//     <li key={subSection.id}>
//     <Link
//         href={`#${subSection.id}`}
//         className={
//         isActive(subSection)
//             ? 'text-sky-500'
//             : 'hover:text-slate-600
// dark:hover:text-slate-300'         }
//     >
//         {subSection.title}
//     </Link>
//     </li>
// ))}
// </ol>
