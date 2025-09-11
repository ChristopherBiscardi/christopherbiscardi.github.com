use leptos::{logging::log, prelude::*};
#[cfg(not(feature = "ssr"))]
use leptos_use::{use_event_listener, use_window};

const STYLES: &str = "#top-progress {
    background: #11151da6;
  }
  #top-progress::-webkit-progress-value {
    background: linear-gradient(
      124deg,
      #ff2400,
      #e81d1d,
      #e8b71d,
      #e3e81d,
      #1de840,
      #1ddde8,
      #2b1de8,
      #dd00f3,
      #dd00f3
    );
    background-size: 100vw;
    opacity: 0.4;
  }
  #top-progress::-webkit-progress-bar {
    background: transparent;
    opacity: 1;
  }
  #top-progress::-moz-progress-bar {
    background: linear-gradient(
      124deg,
      #ff2400,
      #e81d1d,
      #e8b71d,
      #e3e81d,
      #1de840,
      #1ddde8,
      #2b1de8,
      #dd00f3,
      #dd00f3
    );
    background-size: 100vw;
    opacity: 0.4;
  }";

#[cfg(not(feature = "ssr"))]
fn get_indicator_percentage_width(
    current_pos: f64,
    total_scroll: f64,
) -> f64 {
    (current_pos / total_scroll) * 100.
}

#[component]
pub fn ProgressBar() -> impl IntoView {
    let scroll_position_percentage = RwSignal::new(0.);

    #[cfg(not(feature = "ssr"))]
    Effect::watch(
        move || {},
        move |_, _, _| {
            let _ = use_event_listener(
                use_window(),
                leptos::ev::scroll,
                move |_| {
                    log!("click from element");

                    let Some(ref window) = *use_window()
                    else {
                        return;
                    };

                    let current_pos =
                        window.scroll_y().unwrap();
                    let inner_height = window
                        .inner_height()
                        .unwrap()
                        .as_f64()
                        .unwrap_or(0.);
                    let scroll_height = get_scroll_height();
                    let scroll_distance =
                        scroll_height as f64 - inner_height;

                    let indicator_width =
                        get_indicator_percentage_width(
                            current_pos,
                            scroll_distance,
                        );

                    scroll_position_percentage
                        .set(indicator_width);
                },
            );

            let win = use_window();
            let window = win.as_ref().unwrap();

            let inner_height = window
                .inner_height()
                .unwrap()
                .as_f64()
                .unwrap_or(0.);
            let scroll_height = get_scroll_height();
            let scroll_distance =
                scroll_height as f64 - inner_height;
            let indicator_width =
                get_indicator_percentage_width(
                    window.scroll_y().unwrap(),
                    scroll_distance,
                );

            scroll_position_percentage.set(indicator_width);
        },
        false,
    );

    view! {
        <>
            <style>{STYLES}</style>
            <progress
                id="top-progress"
                class="z-50 fixed top-0 left-0 appearance-none w-full h-1 opacity-100"
                // value={isNaN(scroll_position_pecentage) ? 100. : scroll_position_pecentage}
                value=scroll_position_percentage
                max="100"
            >
                70 %
            </progress>
        </>
    }
}

#[cfg(not(feature = "ssr"))]
// find the total height of window
fn get_scroll_height() -> i32 {
    let win = use_window();
    let document = win.document();
    // https://javascript.info/size-and-scroll-window#width-height-of-the-document
    *[
        document.body().unwrap().scroll_height(),
        document
            .as_ref()
            .unwrap()
            .document_element()
            .unwrap()
            .scroll_height(),
        document.body().unwrap().offset_height(),
        // document
        //     .document_element()
        //     .unwrap()
        //     .offset_height(),
        document.body().unwrap().client_height(),
        document
            .as_ref()
            .unwrap()
            .document_element()
            .unwrap()
            .client_height(),
    ]
    .iter()
    .max()
    .unwrap()
}
