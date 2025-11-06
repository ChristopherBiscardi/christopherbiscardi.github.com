// #import("./colors.typ")
#import "@preview/zebraw:0.5.5": *

#show link: underline

// level can be note, info?, warning?
#let note(level: "note", body) = [
  #context {
  if target() != "html" {   
    // TK: body style in PDF for notes
    [#body]
  } else {
    html.div(class: "markdown-alert markdown-alert-" + level)[
      #html.p(class: "markdown-alert-title")[#smallcaps[#level]]
      #body
    ]
  }
  }
]

#let highlight(..options, code) = [
  #context {
  if target() != "html" {
    show raw.where(block: true): it => {
      set raw(theme: "/assets/night-owlish.tmtheme")
      set text(font:("Meslo LG L DZ for Powerline", "Comic Sans MS"))
      zebraw(
        numbering: it.lang != "shell" and it.lang != none,
        background-color: rgb("#F6F6F6"),
        highlight-color: rgb("#e6e6e6"),
        comment-color: rgb("#e6e6e6"),
        ..options,
        it
      )
    }
    [#code]
   } else {
      set raw(theme: "/assets/night-owlish.tmtheme")
      [#code]
  }
}
]
#let template(title, doc) = [
#set heading(numbering: "1.")

// TODO: change id of headings in html documents?
#show heading: set text(font: ("Outfit", "Comic Sans MS"))

// #show raw: it => [
//     #set raw(theme: "assets/night-owlish.tmtheme")
//     #set text(font:("Meslo LG L DZ for Powerline", "Comic Sans MS"))
//     #it
// ]

// #set text(font: ("Tiempos Text", "Comic Sans MS"))

#set par(
  first-line-indent: 1.5em,
)

#context {
  if target() != "html" {
    show raw.where(block: true): it => {
      set raw(theme: "/assets/night-owlish.tmtheme")
      set text(font:("Meslo LG L DZ for Powerline", "Comic Sans MS"))
      zebraw(
        numbering: it.lang != "shell" and it.lang != none,
        background-color: rgb("#F6F6F6"),
        highlight-color: rgb("#e6e6e6"),
        comment-color: rgb("#F6F6F6"),
        it
      )
    }
    set page(
      paper: "us-letter",
      header: align(right)[
        #title : Chris Biscardi
      ],
      numbering: "1",
    )
    [
      #doc,
      #bibliography("/bibliography.yaml", title: "References")
    ]
   } else {
      set raw(theme: "/assets/night-owlish.tmtheme")

    show image: it => {
      if it.source.starts-with("/assets/") {
        [#html.img(
          alt: it.alt,
          // We assume that the typst dir is the project
          // root, which means the prefix for images is `assets`
          // in the file path. remove this to get the "right"
          // static file when shipped to CDN
          src:  it.source.trim("/assets", at: start),
        )]
      } else if it.source.starts-with("http") {
        [#html.img(
          alt: it.alt,
          // We assume that the typst dir is the project
          // root, which also coincides with the url the assets
          // end up at. So just add the root "/" here for html output
          src: it.source,
        )]
      } else {
        // TODO: allow http(s) and warn if otherwise
        // error out!
        [#it]
        // assert(false, message: "images must be an http(s) url or an `assets/` filepath");
      }
      
    }
    [
      #doc
      #bibliography("/bibliography.yaml", title: "References")
    ]
  }
}

]

// #let quote(body: ["test quote"]) = {
//   v(1em)
//   rect(inset: 10%,
//     stroke: (
//         left: 2pt + black,
//         rest: none
//         ),
//    [
//     #set text(20pt, font: ("Tiempos Text", "Comic Sans MS"))
//     #body
//   ])

// }
